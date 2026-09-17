// import { createClient } from "jsr:@supabase/supabase-js@2";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// };

// Deno.serve(async (req: Request) => {
//   // CORS preflight
//   if (req.method === "OPTIONS") {
//     return new Response("ok", {
//       headers: corsHeaders,
//     });
//   }

//   try {
//     const supabaseUrl = Deno.env.get("SUPABASE_URL");
//     const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
//     const supabaseServiceRoleKey = Deno.env.get(
//       "SUPABASE_SERVICE_ROLE_KEY"
//     );

//     if (
//       !supabaseUrl ||
//       !supabaseAnonKey ||
//       !supabaseServiceRoleKey
//     ) {
//       return new Response(
//         JSON.stringify({
//           error: "Supabase environment variables are missing.",
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Client using the logged-in user's JWT
//     const authHeader = req.headers.get("Authorization");

//     if (!authHeader) {
//       return new Response(
//         JSON.stringify({
//           error: "Authentication required.",
//         }),
//         {
//           status: 401,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     const supabaseUser = createClient(
//       supabaseUrl,
//       supabaseAnonKey,
//       {
//         global: {
//           headers: {
//             Authorization: authHeader,
//           },
//         },
//       }
//     );

//     // Verify logged-in user
//     const {
//       data: {
//         user,
//       },
//       error: userError,
//     } = await supabaseUser.auth.getUser();

//     if (userError || !user) {
//       return new Response(
//         JSON.stringify({
//           error: "Invalid or expired authentication session.",
//         }),
//         {
//           status: 401,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Admin client — service role stays ONLY inside Edge Function
//     const supabaseAdmin = createClient(
//       supabaseUrl,
//       supabaseServiceRoleKey
//     );

//     // Check caller's profile role
//     const {
//       data: callerProfile,
//       error: profileError,
//     } = await supabaseAdmin
//       .from("profiles")
//       .select("role")
//       .eq("id", user.id)
//       .maybeSingle();

//     if (profileError) {
//       console.error("Profile lookup failed:", profileError);

//       return new Response(
//         JSON.stringify({
//           error: "Unable to verify your account role.",
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     if (callerProfile?.role !== "admin") {
//       return new Response(
//         JSON.stringify({
//           error: "Only administrators can add teachers.",
//         }),
//         {
//           status: 403,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Read request body
//     const body = await req.json();

//     const fullName =
//       typeof body.fullName === "string"
//         ? body.fullName.trim()
//         : "";

//     const email =
//       typeof body.email === "string"
//         ? body.email.trim().toLowerCase()
//         : "";

//     if (!fullName || !email) {
//       return new Response(
//         JSON.stringify({
//           error: "Full name and email are required.",
//         }),
//         {
//           status: 400,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailPattern.test(email)) {
//       return new Response(
//         JSON.stringify({
//           error: "Please enter a valid email address.",
//         }),
//         {
//           status: 400,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Check existing Auth users
//     const {
//       data: usersData,
//       error: usersError,
//     } =
//       await supabaseAdmin.auth.admin.listUsers({
//         page: 1,
//         perPage: 1000,
//       });

//     if (usersError) {
//       console.error("User lookup failed:", usersError);

//       return new Response(
//         JSON.stringify({
//           error: "Unable to check existing accounts.",
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     const existingUser = usersData.users.find(
//       (existingUser) =>
//         existingUser.email?.toLowerCase() === email
//     );

//     if (existingUser) {
//       return new Response(
//         JSON.stringify({
//           error: "An account with this email already exists.",
//         }),
//         {
//           status: 409,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Create Auth account WITHOUT a password
//     const {
//       data: createdUser,
//       error: createUserError,
//     } =
//       await supabaseAdmin.auth.admin.createUser({
//         email,
//         email_confirm: false,
//         user_metadata: {
//           full_name: fullName,
//           role: "teacher",
//         },
//       });

//     if (createUserError) {
//       console.error(
//         "Teacher account creation failed:",
//         createUserError
//       );

//       return new Response(
//         JSON.stringify({
//           error:
//             createUserError.message ||
//             "Failed to create teacher account.",
//         }),
//         {
//           status: 400,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     if (!createdUser?.user?.id) {
//       return new Response(
//         JSON.stringify({
//           error:
//             "Teacher account was created but user ID was not returned.",
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     const teacherId = createdUser.user.id;

//     // Create teacher profile
//     const {
//       error: profileUpsertError,
//     } = await supabaseAdmin
//       .from("profiles")
//       .upsert({
//         id: teacherId,
//         full_name: fullName,
//         role: "teacher",
//         updated_at: new Date().toISOString(),
//       });

//     if (profileUpsertError) {
//       console.error(
//         "Teacher profile creation failed:",
//         profileUpsertError
//       );

//       // Clean up Auth account if profile creation fails
//       await supabaseAdmin.auth.admin.deleteUser(
//         teacherId
//       );

//       return new Response(
//         JSON.stringify({
//           error:
//             "Teacher account could not be completed.",
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Save teacher in management table
//     const {
//       error: teacherTableError,
//     } = await supabaseAdmin
//       .from("teachers")
//       .insert({
//         id: teacherId,
//         full_name: fullName,
//         email,
//         status: "Active",
//       });

//     if (teacherTableError) {
//       console.error(
//         "Teacher table insert failed:",
//         teacherTableError
//       );

//       // Clean up profile and Auth account
//       await supabaseAdmin
//         .from("profiles")
//         .delete()
//         .eq("id", teacherId);

//       await supabaseAdmin.auth.admin.deleteUser(
//         teacherId
//       );

//       return new Response(
//         JSON.stringify({
//           error:
//             "Teacher account could not be saved.",
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     // Send password setup email
//     const {
//       error: resetEmailError,
//     } =
//       await supabaseAdmin.auth.resetPasswordForEmail(
//         email,
//         {
//           redirectTo:
//             "http://localhost:5173/reset-password",
//         }
//       );

//     if (resetEmailError) {
//       console.error(
//         "Password setup email failed:",
//         resetEmailError
//       );

//       return new Response(
//         JSON.stringify({
//           error:
//             "Teacher account was created, but the password setup email could not be sent.",
//           teacherId,
//         }),
//         {
//           status: 500,
//           headers: {
//             ...corsHeaders,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message:
//           `Teacher account created and password setup email sent to ${email}.`,
//         teacher: {
//           id: teacherId,
//           fullName,
//           email,
//           role: "teacher",
//         },
//       }),
//       {
//         status: 200,
//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     console.error(
//       "Unexpected invite-teacher error:",
//       error
//     );

//     return new Response(
//       JSON.stringify({
//         error:
//           "Something went wrong while creating the teacher account.",
//       }),
//       {
//         status: 500,
//         headers: {
//           ...corsHeaders,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// });  





























import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({
          error: "Supabase server configuration is missing.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 1. Verify logged-in user
    // --------------------------------------------------

    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: "Authentication required.",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabaseUser = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          error: "Invalid or expired login session.",
        }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 2. Create admin client
    // --------------------------------------------------

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey
    );

    // --------------------------------------------------
    // 3. Verify caller is Admin
    // --------------------------------------------------

    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if (profileError) {
      console.error("Profile lookup error:", profileError);

      return new Response(
        JSON.stringify({
          error: "Unable to verify administrator permissions.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (profile?.role !== "admin") {
      return new Response(
        JSON.stringify({
          error: "Only administrators can add teachers.",
        }),
        {
          status: 403,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 4. Read request
    // --------------------------------------------------

    const body = await req.json();

    const fullName =
      typeof body.fullName === "string"
        ? body.fullName.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!fullName || !email) {
      return new Response(
        JSON.stringify({
          error: "Full name and email are required.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return new Response(
        JSON.stringify({
          error: "Please enter a valid email address.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 5. Check if email already exists in Auth
    // --------------------------------------------------

    const { data: usersData, error: usersError } =
      await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });

    if (usersError) {
      console.error("Auth user lookup error:", usersError);

      return new Response(
        JSON.stringify({
          error: "Unable to check existing accounts.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const existingUser = usersData.users.find(
      (existingUser: { email?: string }) =>
        existingUser.email?.toLowerCase() === email
    );

    if (existingUser) {
      return new Response(
        JSON.stringify({
          error: "An account with this email already exists.",
        }),
        {
          status: 409,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 6. Send Supabase teacher invitation
    // --------------------------------------------------

    const redirectTo =
      "http://localhost:5173/reset-password";

    const { data: invitedUser, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          data: {
            full_name: fullName,
            role: "teacher",
          },
          redirectTo,
        }
      );

    if (inviteError) {
      console.error("Teacher invitation error:", inviteError);

      return new Response(
        JSON.stringify({
          error:
            inviteError.message ||
            "Unable to send teacher invitation.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!invitedUser?.user?.id) {
      return new Response(
        JSON.stringify({
          error: "Teacher account was not created correctly.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const teacherId = invitedUser.user.id;

    // --------------------------------------------------
    // 7. Create / update profile
    // --------------------------------------------------

    const { error: profileUpsertError } =
      await supabaseAdmin
        .from("profiles")
        .upsert({
          id: teacherId,
          full_name: fullName,
          role: "teacher",
          updated_at: new Date().toISOString(),
        });

    if (profileUpsertError) {
      console.error(
        "Teacher profile error:",
        profileUpsertError
      );

      await supabaseAdmin.auth.admin.deleteUser(teacherId);

      return new Response(
        JSON.stringify({
          error: "Teacher profile could not be created.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 8. Save teacher in teachers table
    // --------------------------------------------------

    const { error: teacherInsertError } =
      await supabaseAdmin
        .from("teachers")
        .insert({
          id: teacherId,
          full_name: fullName,
          email,
          status: "Active",
        });

    if (teacherInsertError) {
      console.error(
        "Teacher table error:",
        teacherInsertError
      );

      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", teacherId);

      await supabaseAdmin.auth.admin.deleteUser(teacherId);

      return new Response(
        JSON.stringify({
          error:
            teacherInsertError.code === "23505"
              ? "A teacher with this email already exists."
              : "Teacher could not be saved.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // --------------------------------------------------
    // 9. Success
    // --------------------------------------------------

    return new Response(
      JSON.stringify({
        success: true,
        message: `Teacher invitation sent to ${email}.`,
        teacher: {
          id: teacherId,
          fullName,
          email,
          role: "teacher",
        },
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Unexpected invite-teacher error:", error);

    return new Response(
      JSON.stringify({
        error:
          "Something went wrong while creating the teacher account.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});