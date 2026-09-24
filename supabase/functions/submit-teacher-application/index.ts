// import { Resend } from "npm:resend";

// const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// const resend = new Resend(RESEND_API_KEY);

// Deno.serve(async (req) => {
//   // CORS
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers":
//           "authorization, x-client-info, apikey, content-type",
//       },
//     });
//   }

//   if (req.method !== "POST") {
//     return new Response(
//       JSON.stringify({ error: "Method not allowed" }),
//       {
//         status: 405,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     );
//   }

//   try {
//     if (!RESEND_API_KEY) {
//       throw new Error("RESEND_API_KEY is not configured");
//     }

//     const body = await req.json();

//     const {
//       name,
//       email,
//       phone,
//       occupation,
//       qualification,
//       experience,
//       hasOwnCenter,
//       centerName,
//       centerAddress,
//       message,
//       photoUrl,
//       idProofUrl,
//       otherDocuments,
//     } = body;

//     if (!name || !email || !phone || !occupation || !qualification) {
//       return new Response(
//         JSON.stringify({
//           error: "Required application fields are missing.",
//         }),
//         {
//           status: 400,
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//     }

//     const documentsHtml =
//       Array.isArray(otherDocuments) && otherDocuments.length > 0
//         ? otherDocuments
//             .map(
//               (doc: { name: string; url: string }) =>
//                 `<li><a href="${doc.url}" target="_blank">${doc.name}</a></li>`
//             )
//             .join("")
//         : "<li>No additional documents</li>";

//     const { data, error } = await resend.emails.send({
//       from: "TypeMaster Pro <onboarding@resend.dev>",
//       to: ["bhaveshgarale7855@gmail.com"],
//       subject: `New Teacher Application – ${name}`,
//       html: `
//         <div style="font-family:Arial,sans-serif;line-height:1.6">
//           <h2>New Teacher Application</h2>

//           <h3>Personal Details</h3>

//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Occupation:</strong> ${occupation}</p>
//           <p><strong>Qualification:</strong> ${qualification}</p>
//           <p><strong>Teaching Experience:</strong> ${experience || "Not provided"}</p>

//           <h3>Coaching Center</h3>

//           <p>
//             <strong>Own Coaching Center:</strong>
//             ${hasOwnCenter ? "Yes" : "No"}
//           </p>

//           <p>
//             <strong>Center Name:</strong>
//             ${centerName || "Not provided"}
//           </p>

//           <p>
//             <strong>Center Address:</strong>
//             ${centerAddress || "Not provided"}
//           </p>

//           <h3>Additional Information</h3>

//           <p>${message || "No additional information provided."}</p>

//           <h3>Documents</h3>

//           <p>
//             <strong>Profile Photo:</strong>
//             ${
//               photoUrl
//                 ? `<a href="${photoUrl}" target="_blank">View Photo</a>`
//                 : "Not available"
//             }
//           </p>

//           <p>
//             <strong>ID Proof:</strong>
//             ${
//               idProofUrl
//                 ? `<a href="${idProofUrl}" target="_blank">View ID Proof</a>`
//                 : "Not available"
//             }
//           </p>

//           <p><strong>Other Documents:</strong></p>
//           <ul>
//             ${documentsHtml}
//           </ul>

//           <hr />

//           <p>
//             <strong>Application received:</strong>
//             ${new Date().toLocaleString("en-IN")}
//           </p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error("Resend error:", error);

//       return new Response(
//         JSON.stringify({
//           error: "Failed to send application email.",
//           details: error.message,
//         }),
//         {
//           status: 500,
//           headers: {
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Teacher application email sent successfully.",
//         emailId: data?.id,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     );
//   } catch (error) {
//     console.error(error);

//     return new Response(
//       JSON.stringify({
//         error:
//           error instanceof Error
//             ? error.message
//             : "Something went wrong.",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//       }
//     );
//   }
// }); 





import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("APP_SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function response(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return response(
      { error: "Method not allowed" },
      405
    );
  }

  try {
    const body = await req.json();

    /*
     * --------------------------------------------------
     * ACTION 1: CREATE SIGNED UPLOAD URL
     * --------------------------------------------------
     */
    if (body.action === "create-upload-url") {
      const { path } = body;

      if (!path || typeof path !== "string") {
        return response(
          { error: "File path is required." },
          400
        );
      }

      const { data, error } =
        await supabaseAdmin.storage
          .from("teacher-applications")
          .createSignedUploadUrl(path);

      if (error) {
        console.error("Upload URL error:", error);

        return response(
          {
            error: "Could not create upload URL.",
            details: error.message,
          },
          500
        );
      }

      return response({
        success: true,
        token: data.token,
        path: data.path,
      });
    }

    /*
     * --------------------------------------------------
     * ACTION 2: SUBMIT APPLICATION
     * --------------------------------------------------
     */
    if (body.action === "submit-application") {
      const {
        name,
        email,
        phone,
        occupation,
        qualification,
        experience,
        hasOwnCenter,
        centerName,
        centerAddress,
        message,
        photoPath,
        idProofPath,
        otherDocuments,
      } = body;

      if (
        !name ||
        !email ||
        !phone ||
        !occupation ||
        !qualification
      ) {
        return response(
          {
            error:
              "Required application fields are missing.",
          },
          400
        );
      }

      /*
       * Save application to database
       */
      const { data: application, error: dbError } =
        await supabaseAdmin
          .from("teacher_applications")
          .insert({
            name,
            email,
            phone,
            occupation,
            qualification,
            experience: experience || null,
            has_own_center: Boolean(hasOwnCenter),
            center_name: centerName || null,
            center_address: centerAddress || null,
            photo_path: photoPath || null,
            id_proof_path: idProofPath || null,
            other_documents:
              Array.isArray(otherDocuments)
                ? otherDocuments
                : [],
            message: message || null,
            status: "pending",
          })
          .select()
          .single();

      if (dbError) {
        console.error("Database error:", dbError);

        return response(
          {
            error:
              "Could not save teacher application.",
            details: dbError.message,
          },
          500
        );
      }

      /*
       * Create temporary signed URLs
       * Valid for 7 days
       */
      let photoUrl = "";
      let idProofUrl = "";
      const otherDocumentLinks: {
        name: string;
        url: string;
      }[] = [];

      if (photoPath) {
        const { data } =
          await supabaseAdmin.storage
            .from("teacher-applications")
            .createSignedUrl(photoPath, 60 * 60 * 24 * 7);

        photoUrl = data?.signedUrl || "";
      }

      if (idProofPath) {
        const { data } =
          await supabaseAdmin.storage
            .from("teacher-applications")
            .createSignedUrl(
              idProofPath,
              60 * 60 * 24 * 7
            );

        idProofUrl = data?.signedUrl || "";
      }

      if (Array.isArray(otherDocuments)) {
        for (const doc of otherDocuments) {
          if (!doc?.path) continue;

          const { data } =
            await supabaseAdmin.storage
              .from("teacher-applications")
              .createSignedUrl(
                doc.path,
                60 * 60 * 24 * 7
              );

          if (data?.signedUrl) {
            otherDocumentLinks.push({
              name: doc.name || "Document",
              url: data.signedUrl,
            });
          }
        }
      }

      const otherDocumentsHtml =
        otherDocumentLinks.length > 0
          ? otherDocumentLinks
              .map(
                (doc) =>
                  `<li>
                    <a href="${doc.url}" target="_blank">
                      ${doc.name}
                    </a>
                  </li>`
              )
              .join("")
          : "<li>No additional documents</li>";

      /*
       * Send email
       */
      const { data: emailData, error: emailError } =
        await resend.emails.send({
          from: "TypeMaster Pro <onboarding@resend.dev>",
          to: ["bhaveshgarale7855@gmail.com"],

          subject: `New Teacher Application – ${name}`,

          html: `
            <div style="
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #222;
            ">

              <h2 style="color:#2563eb;">
                New Teacher Application
              </h2>

              <p>
                <strong>Application ID:</strong>
                ${application.id}
              </p>

              <hr />

              <h3>Personal Details</h3>

              <p>
                <strong>Name:</strong>
                ${name}
              </p>

              <p>
                <strong>Email:</strong>
                ${email}
              </p>

              <p>
                <strong>Phone:</strong>
                ${phone}
              </p>

              <p>
                <strong>Occupation:</strong>
                ${occupation}
              </p>

              <p>
                <strong>Qualification:</strong>
                ${qualification}
              </p>

              <p>
                <strong>Teaching Experience:</strong>
                ${experience || "Not provided"}
              </p>

              <h3>Coaching Center</h3>

              <p>
                <strong>Own Coaching Center:</strong>
                ${hasOwnCenter ? "Yes" : "No"}
              </p>

              <p>
                <strong>Center Name:</strong>
                ${centerName || "Not provided"}
              </p>

              <p>
                <strong>Center Address:</strong>
                ${centerAddress || "Not provided"}
              </p>

              <h3>Additional Information</h3>

              <p>
                ${message || "No additional information provided."}
              </p>

              <h3>Documents</h3>

              <p>
                <strong>Profile Photo:</strong>
                ${
                  photoUrl
                    ? `<a href="${photoUrl}" target="_blank">
                        View Profile Photo
                       </a>`
                    : "Not uploaded"
                }
              </p>

              <p>
                <strong>ID Proof:</strong>
                ${
                  idProofUrl
                    ? `<a href="${idProofUrl}" target="_blank">
                        View ID Proof
                       </a>`
                    : "Not uploaded"
                }
              </p>

              <p>
                <strong>Other Documents:</strong>
              </p>

              <ul>
                ${otherDocumentsHtml}
              </ul>

              <hr />

              <p>
                <strong>Application Status:</strong>
                Pending
              </p>

              <p>
                <strong>Submitted:</strong>
                ${new Date().toLocaleString("en-IN")}
              </p>

              <p style="color:#666;font-size:13px;">
                Document links are temporary and remain valid
                for 7 days.
              </p>

            </div>
          `,
        });

      if (emailError) {
        console.error("Resend error:", emailError);

        /*
         * Application is already saved in DB.
         * Mark email failure but don't lose application.
         */
        return response(
          {
            success: false,
            applicationSaved: true,
            error:
              "Application saved, but email could not be sent.",
            details: emailError.message,
          },
          500
        );
      }

      return response({
        success: true,
        applicationSaved: true,
        emailSent: true,
        applicationId: application.id,
        emailId: emailData?.id,
        message:
          "Teacher application submitted successfully.",
      });
    }

    return response(
      {
        error: "Invalid action.",
      },
      400
    );
  } catch (error) {
    console.error("Function error:", error);

    return response(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      500
    );
  }
});