import { TypingPassage } from '../types';

/* =========================================================
   PASSAGE FACTORY
========================================================= */

const makePassage = (
    id: string,
    title: string,
    category: TypingPassage['category'],
    difficulty: 'Easy' | 'Medium' | 'Hard',
    topic: string,
    sentences: string[]
): TypingPassage => {
    const content = sentences.join(' ');

    return {
        id,
        title,
        category,
        difficulty,
        wordCount: content.trim().split(/\s+/).length,
        author: 'TypeMaster Pro Exam Practice',
        content,
    };
};


/* =========================================================
   ENGLISH GCC-TBC PASSAGES
   Existing 10 passages preserved
========================================================= */

export const GCC_PASSAGES: TypingPassage[] = [

    makePassage(
        'gcc-en-1',
        'The Art of Touch Typing',
        'Technology',
        'Easy',
        'touch typing',
        [
            'Touch typing is a practical computer skill that allows a person to type without constantly looking at the keyboard.',
            'The method depends on placing each finger over a particular group of keys and learning their positions through regular practice.',
            'At the beginning, typing may feel slow because the hands are learning new movements.',
            'With patience, repeated exercises gradually build muscle memory.',
            'Good posture is also important because comfortable shoulders, relaxed wrists, and a balanced sitting position can reduce unnecessary strain during long practice sessions.',
            'A learner should focus first on accuracy rather than speed.',
            'When letters are entered correctly, the brain can concentrate on building a steady rhythm instead of stopping to correct mistakes.',
            'Short daily sessions are often more useful than one very long session each week.',
            'Practice can include common words, short sentences, numbers, punctuation, and paragraphs.',
            'Over time, the learner becomes more confident and can type school assignments, reports, messages, and other documents with less effort.',
            'Typing skill is especially useful in education because students often need to prepare notes, submit projects, search for information, and communicate online.',
            'It is also valuable in workplaces where employees regularly use computers.',
            'A strong typing foundation does not come from rushing.',
            'It comes from consistent practice, careful finger placement, correct technique, and a willingness to learn from errors.',
            'Once these habits become natural, higher speed can develop without sacrificing accuracy.'
        ]
    ),

    makePassage(
        'gcc-en-2',
        'Modern Technology and Daily Life',
        'Technology',
        'Easy',
        'modern technology',
        [
            'Modern technology has changed the way people learn, work, communicate, and solve everyday problems.',
            'Computers can process large amounts of information quickly, while mobile devices allow people to access useful services from almost anywhere.',
            'The internet connects schools, businesses, libraries, government services, and communities across long distances.',
            'Students can use digital tools to organize notes, practice skills, attend classes, and collaborate on projects.',
            'Businesses use technology to manage records, communicate with customers, analyze information, and automate repetitive tasks.',
            'Cloud services make it possible to store and access files on different devices, which can improve convenience and teamwork.',
            'At the same time, technology requires responsible use.',
            'Strong passwords, software updates, privacy settings, and careful handling of unknown messages can help protect personal information.',
            'People should also verify information before sharing it because false or incomplete content can spread quickly online.',
            'Learning basic digital skills is therefore useful for almost everyone.',
            'A person does not need to become a programmer to benefit from technology, but understanding files, applications, browsers, security practices, and online communication can make daily tasks easier.',
            'Technology is most valuable when it solves a real problem and is used thoughtfully.',
            'As new tools continue to appear, learners who remain curious and willing to practice can adapt more easily.',
            'The goal is not simply to use every new device, but to understand which tools are useful and how they can support education, work, creativity, and responsible communication.'
        ]
    ),

    makePassage(
        'gcc-en-3',
        'How Scientific Thinking Works',
        'Science',
        'Medium',
        'scientific thinking',
        [
            'Scientific progress often begins with a simple question about how the world works.',
            'Researchers observe a problem, collect information, form possible explanations, and design experiments or studies to test their ideas.',
            'Careful measurement is important because reliable results depend on accurate observations.',
            'Scientists also repeat experiments and compare evidence so that conclusions are not based on a single unexpected result.',
            'Modern science covers many fields, including physics, chemistry, biology, astronomy, environmental science, and computer science.',
            'Each field uses different methods, but all depend on curiosity, evidence, and logical reasoning.',
            'Technology has made scientific research faster in many areas.',
            'Powerful computers can analyze large datasets, microscopes can reveal very small structures, and satellites can collect information about Earth from space.',
            'Scientific knowledge also changes when new evidence provides a better explanation.',
            'This is not a weakness of science; it is one of its strengths.',
            'A good scientific explanation should be open to testing and improvement.',
            'Students can develop scientific thinking by asking clear questions, checking sources, recording observations, and distinguishing facts from guesses.',
            'These habits are useful beyond laboratories because everyday decisions also require evidence and careful reasoning.',
            'Whether a person is comparing products, understanding weather information, or evaluating a claim online, scientific thinking encourages them to ask what evidence supports the statement.',
            'In this way, science is not only a collection of facts but also a method for understanding the world more carefully.'
        ]
    ),

    makePassage(
        'gcc-en-4',
        'The History of Communication',
        'History',
        'Medium',
        'communication history',
        [
            'The history of communication shows how human beings have continually searched for faster and clearer ways to share ideas.',
            'Early communities depended on spoken language, gestures, drawings, and physical signs.',
            'Written records later allowed information to survive beyond the memory of one person.',
            'The development of paper and organized systems of writing made it easier to preserve knowledge and exchange messages across generations.',
            'Printing technology created another major change by allowing books and other written materials to be produced in much larger numbers.',
            'As transportation improved, postal systems helped messages travel between distant places.',
            'The telegraph introduced the ability to send coded information over long distances much faster than physical mail.',
            'Telephones then made direct voice communication possible across cities and countries.',
            'Radio and television brought information and entertainment to large audiences at the same time.',
            'The arrival of computers and the internet created an even more connected communication environment.',
            'Today, a message can reach people around the world within seconds through websites, email, and online platforms.',
            'Each stage of this development has created opportunities as well as challenges.',
            'Faster communication can support education, business, emergency response, and cooperation, but it can also spread mistakes quickly.',
            'Learning to communicate responsibly therefore remains important even as technology changes.',
            'The history of communication reminds us that tools may evolve, but the basic human need to share knowledge, coordinate activities, tell stories, and maintain relationships remains constant.'
        ]
    ),

    makePassage(
        'gcc-en-5',
        'Building a Successful Business',
        'Business',
        'Hard',
        'business management',
        [
            'A healthy business depends on more than selling a product.',
            'It must understand customer needs, manage resources carefully, provide reliable service, and adapt when conditions change.',
            'Before launching a new product, a business may study its market to understand who might buy it and what problems customers want solved.',
            'Good planning can help a company decide how much to produce, how to price an item, and how to communicate its value.',
            'Financial management is equally important because revenue alone does not guarantee success.',
            'A business must consider expenses such as salaries, materials, transportation, technology, rent, and marketing.',
            'Record keeping helps managers understand where money is being spent and whether operations are sustainable.',
            'Customer feedback can also reveal problems that internal teams may not notice.',
            'When employees listen carefully and respond professionally, customers are more likely to trust the organization.',
            'Technology now supports many business activities, including online payments, inventory management, customer support, data analysis, and digital marketing.',
            'However, tools are useful only when they support clear goals.',
            'A successful organization usually combines technology with good communication, teamwork, ethical decisions, and consistent service.',
            'Businesses also need to prepare for uncertainty because customer preferences, competition, and economic conditions can change.',
            'Small improvements made regularly can have a significant effect over time.',
            'The strongest businesses often focus on creating long-term value rather than chasing quick results.',
            'They learn from mistakes, measure performance, respect customers, and keep improving their products and processes.'
        ]
    ),

    makePassage(
        'gcc-en-6',
        'The Value of Reading',
        'Literature',
        'Easy',
        'reading',
        [
            'Reading is a skill that can improve knowledge, imagination, vocabulary, and concentration.',
            'Different kinds of reading serve different purposes.',
            'A student may read a textbook to understand a subject, a news report to learn about an event, or a story to explore characters and ideas.',
            'Effective readers do more than recognize words.',
            'They notice the main point, connect information, ask questions, and remember important details.',
            'Before reading a long passage, it can help to look at the title and headings and think about what the material might discuss.',
            'During reading, difficult words can be marked for later review instead of interrupting every sentence.',
            'After finishing, a reader can summarize the main ideas in their own words.',
            'This process improves understanding and makes revision easier.',
            'Regular reading also strengthens language skills because people repeatedly encounter new vocabulary in meaningful contexts.',
            'Over time, they become more comfortable with sentence structure, punctuation, and different writing styles.',
            'Digital reading has made information easier to access, but it also requires attention because online pages often contain advertisements, links, and distractions.',
            'Choosing a quiet place and setting a specific reading goal can improve focus.',
            'Reading does not always have to be difficult or lengthy to be useful.',
            'Even a few pages each day can build a consistent habit.',
            'For students, this habit can support performance across many subjects because strong reading skills make it easier to understand questions, instructions, explanations, and reference material.'
        ]
    ),

    makePassage(
        'gcc-en-7',
        'Understanding Computer Systems',
        'Technology',
        'Medium',
        'computer systems',
        [
            'A computer follows instructions through a combination of hardware and software.',
            'Hardware includes physical components such as the processor, memory, storage devices, keyboard, display, and network equipment.',
            'Software provides the instructions that tell these components what to do.',
            'An operating system manages important tasks and provides an environment in which applications can run.',
            'When a user opens a program, the computer loads the required instructions and data into memory so the processor can work with them.',
            'Different components have different responsibilities, but they must cooperate for the system to operate smoothly.',
            'Storage keeps information available even after the computer is turned off, while temporary memory provides fast access to information needed during current tasks.',
            'Networks allow computers to exchange data, making services such as websites, file sharing, video calls, and online applications possible.',
            'Understanding these basic concepts helps users troubleshoot common problems.',
            'For example, a slow computer may have too many programs running, limited storage, or insufficient available memory.',
            'A network problem may involve the device, router, connection, or service provider.',
            'Good computer habits include keeping software updated, organizing files, backing up important information, and avoiding suspicious downloads.',
            'Students who understand how computers work can also learn programming more effectively because they begin to see how instructions, data, and hardware interact.',
            'Computer literacy is therefore not only about operating applications.',
            'It is about understanding enough of the system to use technology confidently, safely, and efficiently.'
        ]
    ),

    makePassage(
        'gcc-en-8',
        'The Importance of Time Management',
        'Business',
        'Medium',
        'time management',
        [
            'Time management is an important skill for students because school, projects, practice, rest, and personal activities all compete for attention.',
            'A useful schedule does not need to be complicated.',
            'The first step is to identify important tasks and estimate how much time each one may require.',
            'Large assignments can then be divided into smaller steps so that progress feels manageable.',
            'For example, a project might be separated into research, planning, writing, coding, testing, and final review.',
            'Completing one step at a time can reduce the feeling of being overwhelmed.',
            'Short focused study sessions can also be effective when they include clear goals and limited distractions.',
            'Mobile notifications, unnecessary browsing, and frequent switching between tasks can make concentration harder.',
            'Keeping the phone away during focused work may help some students maintain attention.',
            'Breaks are also important because the brain needs time to recover after sustained concentration.',
            'A realistic schedule should include sleep, meals, movement, and relaxation rather than treating every minute as study time.',
            'At the end of the day, reviewing completed tasks can show what worked and what should be changed tomorrow.',
            'Time management is not about filling every hour with work.',
            'It is about using available time intentionally and leaving enough flexibility for unexpected situations.',
            'Students who develop this habit can become more consistent with revision and project work.',
            'The same skill can later help in professional life, where deadlines, meetings, responsibilities, and changing priorities must be handled without losing track of important goals.'
        ]
    ),

    makePassage(
        'gcc-en-9',
        'Growth of Modern Cities',
        'History',
        'Hard',
        'urban development',
        [
            'The development of cities has been closely connected with transportation, trade, industry, and access to resources.',
            'People often settle where water, fertile land, roads, or other useful resources are available.',
            'As communities grow, they develop markets, schools, workplaces, public services, and systems for moving people and goods.',
            'Roads and railways can connect a city with surrounding regions, while ports and airports can connect it to national and international networks.',
            'Urban growth can create opportunities because large communities bring together workers, businesses, educational institutions, and cultural activities.',
            'However, rapid growth can also create challenges.',
            'Traffic congestion, pollution, waste management, housing shortages, and pressure on public infrastructure may increase when development is not carefully planned.',
            'Modern city planning therefore considers more than the construction of buildings.',
            'It may include public transportation, parks, pedestrian areas, drainage systems, water supply, energy use, and emergency services.',
            'Technology is increasingly used to monitor traffic, manage public facilities, and improve access to information.',
            'Citizens also play an important role by following public rules, protecting shared spaces, reducing waste, and reporting problems responsibly.',
            'A successful city must balance economic activity with quality of life and environmental needs.',
            'Planning for the future is especially important because infrastructure can remain in use for decades.',
            'When governments, businesses, and communities cooperate, cities can become safer, more efficient, and more inclusive.',
            'Urban development is therefore not simply about making a city larger; it is about creating places where people can live, learn, work, and travel effectively.'
        ]
    ),

    makePassage(
        'gcc-en-10',
        'Learning Through Consistent Practice',
        'Science',
        'Hard',
        'learning and practice',
        [
            'Learning a new skill is usually a gradual process rather than a single event.',
            'At first, a learner may make frequent mistakes because the brain is trying to understand unfamiliar information and movements.',
            'These mistakes are useful when they are noticed and corrected.',
            'Effective practice should therefore include feedback.',
            'Instead of repeating the same error many times, a learner can identify the problem, slow down, and practice the difficult part separately.',
            'Consistency is another important factor.',
            'Practicing for a reasonable amount of time on several days is often easier to maintain than attempting a very long session once in a while.',
            'Clear goals also make practice more meaningful.',
            'A student learning typing, for example, might first aim for accurate finger placement, then improve steady rhythm, and later work toward higher speed.',
            'Progress can be measured through simple records such as accuracy, completion time, or successful attempts.',
            'Comparing current performance with an earlier personal result can show improvement without creating unnecessary pressure.',
            'Rest is also part of learning because attention becomes weaker when a person is tired.',
            'A supportive environment can make practice easier by providing clear instructions, useful examples, and opportunities to try again.',
            'Whether the skill involves typing, programming, mathematics, communication, or another subject, patience remains valuable.',
            'Difficult tasks often become easier after repeated exposure.',
            'The most successful learners are not necessarily those who never make mistakes.',
            'They are often the people who continue practicing, understand their errors, adjust their methods, and remain willing to learn something new.'
        ]
    ),
];


/* =========================================================
   MARATHI GCC-TBC PASSAGES
========================================================= */

export const GCC_MARATHI_PASSAGES: TypingPassage[] = [

    makePassage(
        'gcc-mr-1',
        'संगणक आणि आधुनिक जीवन',
        'Technology',
        'Easy',
        'computer and modern life',
        [
            'आजच्या आधुनिक जीवनात संगणकाचे महत्त्व खूप वाढले आहे.',
            'शिक्षण, व्यवसाय, बँकिंग, आरोग्य, कार्यालयीन काम आणि मनोरंजन अशा अनेक क्षेत्रांमध्ये संगणकाचा वापर केला जातो.',
            'संगणकामुळे मोठ्या प्रमाणातील माहिती कमी वेळात साठवता आणि शोधता येते.',
            'विद्यार्थी अभ्यासासाठी शैक्षणिक संकेतस्थळे, डिजिटल पुस्तके आणि विविध संगणकीय साधनांचा उपयोग करतात.',
            'कार्यालयांमध्ये पत्रव्यवहार, नोंदणी, अहवाल तयार करणे आणि माहितीचे व्यवस्थापन यासाठी संगणक आवश्यक ठरतो.',
            'इंटरनेटच्या मदतीने लोक जगातील विविध ठिकाणची माहिती काही क्षणांत मिळवू शकतात.',
            'तंत्रज्ञानाचा योग्य वापर केल्यास वेळ आणि मेहनत दोन्ही वाचू शकतात.',
            'मात्र संगणक वापरताना सुरक्षिततेची काळजी घेणे देखील महत्त्वाचे आहे.',
            'मजबूत संकेतशब्द वापरणे, अनोळखी दुवे उघडणे टाळणे आणि महत्त्वाच्या फाइल्सचा सुरक्षित साठा ठेवणे आवश्यक आहे.',
            'विद्यार्थ्यांनी संगणकाचा वापर केवळ मनोरंजनासाठी न करता नवीन कौशल्ये शिकण्यासाठी करावा.',
            'टायपिंग, लेखन, सादरीकरण, माहिती शोधणे आणि मूलभूत प्रोग्रामिंग यांसारखी कौशल्ये भविष्यात उपयोगी पडतात.',
            'संगणक हे स्वतःमध्ये अंतिम उद्दिष्ट नसून काम अधिक सोपे आणि प्रभावी करण्याचे साधन आहे.',
            'नवीन तंत्रज्ञान सतत विकसित होत असल्यामुळे त्याच्याबरोबर शिकण्याची सवय ठेवणे गरजेचे आहे.',
            'योग्य ज्ञान, सराव आणि जबाबदार वापर यांच्या मदतीने संगणकाचा उपयोग शिक्षण आणि कामासाठी अधिक चांगल्या पद्धतीने करता येतो.'
        ]
    ),

    makePassage(
        'gcc-mr-2',
        'शिक्षणाचे महत्त्व',
        'Literature',
        'Easy',
        'education',
        [
            'शिक्षण हे व्यक्तीच्या विकासाचे एक महत्त्वाचे साधन आहे.',
            'शिक्षणामुळे माणसाला ज्ञान मिळते आणि योग्य निर्णय घेण्याची क्षमता विकसित होते.',
            'शाळा आणि महाविद्यालयांमध्ये विद्यार्थ्यांना विविध विषयांचे ज्ञान मिळते.',
            'पुस्तकांमधून माहिती मिळवण्याबरोबरच प्रश्न विचारणे, चर्चा करणे आणि समस्या सोडवणे यांसारखी कौशल्येही विकसित होतात.',
            'आजच्या काळात पारंपरिक शिक्षणाबरोबर डिजिटल शिक्षणालाही महत्त्व प्राप्त झाले आहे.',
            'संगणक आणि इंटरनेटच्या मदतीने विद्यार्थी विविध विषयांवरील माहिती सहज मिळवू शकतात.',
            'मात्र इंटरनेटवरील प्रत्येक माहिती योग्य असेलच असे नाही.',
            'म्हणून माहितीचा स्रोत तपासणे आणि विश्वासार्ह सामग्री निवडणे आवश्यक आहे.',
            'शिक्षणाचा उद्देश केवळ परीक्षेत चांगले गुण मिळवणे नसून जीवनातील विविध परिस्थितींना सामोरे जाण्याची क्षमता निर्माण करणे हा आहे.',
            'वेळेचे नियोजन, संवाद कौशल्य, सहकार्य, शिस्त आणि जबाबदारी या गोष्टीही शिक्षणातून शिकता येतात.',
            'विद्यार्थ्यांनी आपल्या आवडीच्या क्षेत्रात सातत्याने नवीन गोष्टी शिकण्याचा प्रयत्न केला पाहिजे.',
            'चुका झाल्या तरी त्यातून शिकण्याची वृत्ती ठेवणे महत्त्वाचे आहे.',
            'ज्ञानाचा योग्य उपयोग समाजाच्या प्रगतीसाठी करता येतो.',
            'म्हणून शिक्षण ही केवळ वैयक्तिक प्रगतीची नव्हे तर संपूर्ण समाजाच्या विकासाचीही गुरुकिल्ली आहे.'
        ]
    ),

    makePassage(
        'gcc-mr-3',
        'वेळेचे व्यवस्थापन',
        'Business',
        'Medium',
        'time management',
        [
            'वेळ ही प्रत्येक व्यक्तीसाठी मौल्यवान संपत्ती आहे.',
            'एकदा गेलेला वेळ परत मिळत नाही, त्यामुळे उपलब्ध वेळेचा योग्य उपयोग करणे आवश्यक आहे.',
            'विद्यार्थ्यांच्या जीवनात अभ्यास, प्रकल्प, सराव, विश्रांती आणि वैयक्तिक कामे यांचा समतोल राखणे महत्त्वाचे असते.',
            'यासाठी साधे आणि वास्तववादी वेळापत्रक तयार करता येते.',
            'मोठे काम एकाच वेळी करण्याऐवजी ते लहान भागांमध्ये विभागल्यास काम सोपे वाटते.',
            'उदाहरणार्थ, एखाद्या प्रकल्पासाठी माहिती गोळा करणे, नियोजन करणे, लेखन करणे, प्रोग्राम तयार करणे, चाचणी घेणे आणि अंतिम तपासणी करणे अशी कामे करता येतात.',
            'अभ्यास करताना मोबाईलवरील अनावश्यक सूचना आणि सतत बदलणारे काम यामुळे लक्ष विचलित होऊ शकते.',
            'म्हणून अभ्यासाच्या वेळी अनावश्यक व्यत्यय कमी करणे उपयोगी ठरते.',
            'लहान पण नियमित अभ्यास सत्रे अनेकदा अधिक प्रभावी ठरतात.',
            'पुरेशी झोप, विश्रांती आणि आरोग्याची काळजी घेणेही वेळेच्या नियोजनाचा भाग आहे.',
            'दिवसाच्या शेवटी पूर्ण झालेल्या कामांचा आढावा घेतल्यास पुढील दिवसाचे नियोजन अधिक चांगले करता येते.',
            'वेळेचे व्यवस्थापन म्हणजे प्रत्येक मिनिट कामात घालवणे नव्हे.',
            'महत्त्वाच्या कामांना योग्य वेळ देणे आणि अचानक येणाऱ्या परिस्थितीसाठी काही वेळ राखून ठेवणे हे त्याचे मुख्य उद्दिष्ट आहे.',
            'ही सवय विद्यार्थ्यांना भविष्यातील व्यावसायिक जीवनातही उपयोगी पडते.'
        ]
    ),

    makePassage(
        'gcc-mr-4',
        'महाराष्ट्राचा इतिहास',
        'History',
        'Medium',
        'Maharashtra history',
        [
            'महाराष्ट्राला समृद्ध इतिहास आणि विविध सांस्कृतिक परंपरा लाभल्या आहेत.',
            'या प्रदेशाने अनेक राजे, समाजसुधारक, संत, विचारवंत आणि स्वातंत्र्यसैनिक घडवले.',
            'छत्रपती शिवाजी महाराजांनी स्वराज्याची स्थापना करून महाराष्ट्राच्या इतिहासात महत्त्वाचे स्थान निर्माण केले.',
            'त्यांच्या प्रशासनात शिस्त, नियोजन आणि लोककल्याणाला विशेष महत्त्व होते.',
            'महाराष्ट्रातील संत परंपरेने समाजात भक्ती, समानता आणि नैतिक मूल्यांचा संदेश दिला.',
            'संत ज्ञानेश्वर, संत तुकाराम आणि इतर संतांच्या साहित्याचा मराठी भाषेच्या विकासावर मोठा प्रभाव पडला.',
            'आधुनिक काळात महात्मा ज्योतिराव फुले, सावित्रीबाई फुले आणि डॉ. बाबासाहेब आंबेडकर यांनी शिक्षण आणि सामाजिक सुधारणांसाठी मोठे कार्य केले.',
            'सावित्रीबाई फुले यांनी मुलींच्या शिक्षणासाठी केलेले प्रयत्न विशेष उल्लेखनीय आहेत.',
            'महाराष्ट्राच्या इतिहासात सामाजिक परिवर्तन आणि शिक्षण यांना महत्त्वाचे स्थान आहे.',
            'इतिहासाचा अभ्यास केल्यामुळे भूतकाळातील घटना समजतात आणि वर्तमान परिस्थिती अधिक चांगल्या प्रकारे पाहता येते.',
            'ऐतिहासिक व्यक्तींचे कार्य समजून घेताना त्यांच्या काळातील सामाजिक आणि राजकीय परिस्थितीही लक्षात घेणे आवश्यक आहे.',
            'इतिहास हा केवळ जुन्या घटनांचा संग्रह नसून समाज कसा बदलत गेला याचा अभ्यास आहे.',
            'म्हणून विद्यार्थ्यांनी इतिहासाकडे केवळ परीक्षेचा विषय म्हणून न पाहता अनुभव आणि शिकवण देणारे ज्ञान म्हणून पाहावे.'
        ]
    ),

    makePassage(
        'gcc-mr-5',
        'पर्यावरण संरक्षण',
        'Science',
        'Hard',
        'environment protection',
        [
            'पर्यावरणाचे संतुलन मानवी जीवनासाठी अत्यंत आवश्यक आहे.',
            'हवा, पाणी, जमीन, वनस्पती, प्राणी आणि विविध नैसर्गिक संसाधने एकमेकांशी जोडलेली आहेत.',
            'लोकसंख्या वाढ, औद्योगिकीकरण आणि वाढता कचरा यामुळे पर्यावरणावर मोठा परिणाम होत आहे.',
            'हवेचे प्रदूषण वाढल्यास आरोग्यावर परिणाम होऊ शकतो.',
            'पाण्याचे प्रदूषण झाल्यास मानवाबरोबरच जलचर प्राण्यांनाही धोका निर्माण होतो.',
            'प्लास्टिकचा अतिवापर आणि कचऱ्याचे चुकीचे व्यवस्थापन ही देखील गंभीर समस्या आहे.',
            'पर्यावरणाचे संरक्षण करण्यासाठी प्रत्येक व्यक्तीने आपल्या दैनंदिन सवयींमध्ये काही बदल करणे आवश्यक आहे.',
            'पाण्याची बचत करणे, विजेचा योग्य वापर करणे, कचऱ्याचे वर्गीकरण करणे आणि शक्य तितका पुनर्वापर करणे यामुळे चांगला परिणाम होऊ शकतो.',
            'झाडे लावणे आणि त्यांची काळजी घेणेही महत्त्वाचे आहे.',
            'शाळा आणि महाविद्यालयांमध्ये विद्यार्थ्यांना पर्यावरणाविषयी जागरूक करणे आवश्यक आहे.',
            'सरकार, उद्योग आणि नागरिक यांनी एकत्रितपणे प्रयत्न केल्यास प्रदूषण कमी करता येऊ शकते.',
            'विकास करताना नैसर्गिक संसाधनांचा जबाबदारीने वापर करणे गरजेचे आहे.',
            'आज घेतलेले निर्णय भविष्यातील पिढ्यांवर परिणाम करतात.',
            'म्हणून पर्यावरण संरक्षण ही केवळ सरकारी जबाबदारी नसून प्रत्येक नागरिकाची सामूहिक जबाबदारी आहे.'
        ]
    ),

    makePassage(
        'gcc-mr-6',
        'वाचनाची सवय',
        'Literature',
        'Easy',
        'reading habit',
        [
            'वाचन ही ज्ञान मिळवण्याची एक प्रभावी पद्धत आहे.',
            'नियमित वाचनामुळे शब्दसंग्रह वाढतो, विचार करण्याची क्षमता सुधारते आणि भाषेवरील प्रभुत्व वाढते.',
            'विद्यार्थी पाठ्यपुस्तके, कथा, वर्तमानपत्रे, संदर्भ पुस्तके आणि विविध लेख वाचू शकतात.',
            'प्रत्येक प्रकारच्या वाचनाचा उद्देश वेगळा असतो.',
            'अभ्यासासाठी वाचताना मुख्य मुद्दे समजून घेणे आणि महत्त्वाची माहिती लक्षात ठेवणे आवश्यक आहे.',
            'कठीण शब्द आल्यास त्यांचा अर्थ शोधून नंतर पुन्हा वाचल्यास समज अधिक चांगली होते.',
            'वाचलेल्या मजकुराचा स्वतःच्या शब्दांत सारांश लिहिणे हीदेखील उपयुक्त पद्धत आहे.',
            'डिजिटल साधनांमुळे आज मोठ्या प्रमाणात पुस्तके आणि माहिती सहज उपलब्ध झाली आहे.',
            'मात्र मोबाईल किंवा संगणकावर वाचताना इतर सूचना आणि मनोरंजनामुळे लक्ष विचलित होऊ शकते.',
            'त्यामुळे वाचनासाठी शांत जागा निवडणे आणि ठराविक वेळ देणे चांगले ठरते.',
            'दररोज काही पाने वाचण्याची सवय हळूहळू मजबूत होते.',
            'वाचनामुळे केवळ भाषिक कौशल्य वाढत नाही तर विविध विषयांबद्दल कुतूहल निर्माण होते.',
            'विद्यार्थ्यांनी आपल्या आवडीचे विषय शोधून त्याबद्दल अधिक वाचण्याचा प्रयत्न करावा.',
            'नियमित वाचनामुळे शिक्षणातील अनेक विषय समजून घेणे अधिक सोपे होते आणि स्वतंत्रपणे शिकण्याची क्षमता विकसित होते.'
        ]
    ),

    makePassage(
        'gcc-mr-7',
        'विज्ञान आणि तंत्रज्ञान',
        'Technology',
        'Medium',
        'science and technology',
        [
            'विज्ञान आणि तंत्रज्ञानाने मानवी जीवनात अनेक महत्त्वाचे बदल घडवून आणले आहेत.',
            'वैज्ञानिक संशोधनामुळे निसर्गातील अनेक प्रक्रिया समजून घेता आल्या आहेत.',
            'तंत्रज्ञानाच्या मदतीने या ज्ञानाचा उपयोग विविध समस्यांचे निराकरण करण्यासाठी केला जातो.',
            'आरोग्य क्षेत्रात आधुनिक उपकरणांमुळे रोगांचे निदान आणि उपचार अधिक प्रभावी झाले आहेत.',
            'शेतीमध्ये नवीन पद्धती, यंत्रे आणि हवामानविषयक माहितीचा उपयोग उत्पादन वाढवण्यासाठी केला जातो.',
            'दळणवळणाच्या क्षेत्रात मोबाईल आणि इंटरनेटमुळे जगातील लोक जवळ आले आहेत.',
            'संगणकामुळे माहितीचे विश्लेषण आणि व्यवस्थापन कमी वेळात करता येते.',
            'अंतराळ संशोधनामुळे पृथ्वी आणि विश्वाबद्दलचे ज्ञान वाढले आहे.',
            'तंत्रज्ञानाचे अनेक फायदे असले तरी त्याचा वापर जबाबदारीने करणे आवश्यक आहे.',
            'चुकीची माहिती, गोपनीयतेचा अभाव आणि डिजिटल सुरक्षेच्या समस्या याकडे दुर्लक्ष करता येत नाही.',
            'विद्यार्थ्यांनी तंत्रज्ञानाचा वापर केवळ मनोरंजनासाठी न करता ज्ञान आणि कौशल्य वाढवण्यासाठी करावा.',
            'नवीन तंत्रज्ञान समजून घेण्यासाठी प्रश्न विचारणे आणि प्रत्यक्ष सराव करणे आवश्यक आहे.',
            'विज्ञान आपल्याला प्रश्न विचारायला आणि पुराव्याच्या आधारे निष्कर्ष काढायला शिकवते.',
            'म्हणून विज्ञान आणि तंत्रज्ञानाचा योग्य उपयोग केल्यास समाजाच्या विकासाला मोठी मदत होऊ शकते.'
        ]
    ),

    makePassage(
        'gcc-mr-8',
        'शहरांचा विकास',
        'History',
        'Medium',
        'urban development',
        [
            'शहरांचा विकास हा वाहतूक, व्यापार, उद्योग आणि रोजगाराच्या संधींशी जवळून संबंधित असतो.',
            'लोकांना शिक्षण, आरोग्य, बाजारपेठ आणि रोजगाराच्या सुविधा उपलब्ध असलेल्या ठिकाणी राहणे सोयीचे वाटते.',
            'शहरांची लोकसंख्या वाढल्यानंतर रस्ते, पाणीपुरवठा, वीज, सार्वजनिक वाहतूक आणि कचरा व्यवस्थापन यांसारख्या सुविधांची गरज वाढते.',
            'नियोजनाशिवाय शहरांची वाढ झाल्यास वाहतूक कोंडी, प्रदूषण आणि पाण्याची समस्या निर्माण होऊ शकते.',
            'म्हणून शहराच्या विकासासाठी दीर्घकालीन नियोजन आवश्यक आहे.',
            'सार्वजनिक वाहतूक मजबूत केल्यास रस्त्यांवरील वाहनांची संख्या कमी करण्यास मदत होऊ शकते.',
            'पार्क, मोकळी मैदाने आणि पादचारी मार्ग यांमुळे नागरिकांच्या जीवनमानात सुधारणा होते.',
            'आधुनिक तंत्रज्ञानाचा वापर वाहतूक नियंत्रण आणि सार्वजनिक सेवांच्या व्यवस्थापनासाठी केला जात आहे.',
            'शहरातील नागरिकांनीही सार्वजनिक ठिकाणांची स्वच्छता आणि सुरक्षितता राखण्यास सहकार्य केले पाहिजे.',
            'पाणी आणि ऊर्जा यांसारख्या संसाधनांचा वापर काळजीपूर्वक करणे आवश्यक आहे.',
            'शहराचा विकास म्हणजे फक्त नवीन इमारती बांधणे नव्हे.',
            'नागरिकांना सुरक्षित, स्वच्छ आणि सोयीस्कर जीवन मिळणे हे विकासाचे महत्त्वाचे उद्दिष्ट आहे.',
            'सरकार, व्यवसाय आणि नागरिक यांनी एकत्रितपणे काम केल्यास शहरांचा विकास अधिक संतुलित आणि टिकाऊ पद्धतीने करता येतो.'
        ]
    ),

    makePassage(
        'gcc-mr-9',
        'व्यवसाय आणि कौशल्य',
        'Business',
        'Hard',
        'business and skills',
        [
            'यशस्वी व्यवसायासाठी चांगली कल्पना असण्याबरोबरच योग्य कौशल्ये आणि नियोजन आवश्यक असते.',
            'ग्राहकांच्या गरजा समजून घेणे हे व्यवसायातील महत्त्वाचे काम आहे.',
            'उत्पादनाची गुणवत्ता, योग्य किंमत आणि विश्वासार्ह सेवा यामुळे ग्राहकांचा विश्वास वाढतो.',
            'व्यवसाय चालवताना उत्पन्न आणि खर्च यांची नोंद व्यवस्थित ठेवणे आवश्यक आहे.',
            'तंत्रज्ञानाच्या मदतीने विक्री, साठा, ग्राहक सेवा आणि आर्थिक व्यवहार यांचे व्यवस्थापन करता येते.',
            'मात्र प्रत्येक तंत्रज्ञानाचा उपयोग व्यवसायाच्या गरजेनुसारच केला पाहिजे.',
            'संवाद कौशल्य आणि टीमवर्क ही कोणत्याही संस्थेसाठी महत्त्वाची कौशल्ये आहेत.',
            'कर्मचाऱ्यांनी एकमेकांशी स्पष्टपणे संवाद साधल्यास कामातील चुका कमी होऊ शकतात.',
            'व्यवसायात बदलत्या परिस्थितीनुसार नवीन पद्धती स्वीकारण्याची तयारी असणे आवश्यक आहे.',
            'स्पर्धा वाढल्यामुळे ग्राहकांना चांगली सेवा देणे अधिक महत्त्वाचे झाले आहे.',
            'लहान व्यवसायांनाही डिजिटल साधनांच्या मदतीने नवीन ग्राहकांपर्यंत पोहोचता येते.',
            'यश मिळवण्यासाठी केवळ वेगाने काम करणे पुरेसे नाही.',
            'कामाची गुणवत्ता, प्रामाणिकपणा, वेळेचे नियोजन आणि ग्राहकांचा आदर यांनाही तितकेच महत्त्व आहे.',
            'सातत्याने कौशल्ये सुधारत राहणारा आणि चुका समजून घेणारा व्यवसाय दीर्घकाळ टिकण्याची अधिक शक्यता असते.'
        ]
    ),

    makePassage(
        'gcc-mr-10',
        'सातत्यपूर्ण सरावाचे महत्त्व',
        'Science',
        'Hard',
        'consistent practice',
        [
            'नवीन कौशल्य शिकताना सुरुवातीला चुका होणे ही सामान्य गोष्ट आहे.',
            'सरावाच्या वेळी झालेल्या चुका लक्षात घेऊन त्यामध्ये सुधारणा करणे आवश्यक असते.',
            'एकाच वेळी खूप वेळ सराव करण्यापेक्षा नियमित आणि योग्य पद्धतीने सराव करणे अधिक उपयुक्त ठरते.',
            'उदाहरणार्थ, टायपिंग शिकताना प्रथम अक्षरांची अचूकता सुधारता येते.',
            'त्यानंतर शब्दांचा वेग, वाक्यांचा ताल आणि शेवटी एकूण टायपिंग गती वाढवता येते.',
            'प्रगती मोजण्यासाठी अचूकता, वेळ आणि शब्द प्रति मिनिट यांसारख्या मोजमापांचा उपयोग करता येतो.',
            'सराव करताना एखादी चूक वारंवार होत असल्यास तिचे कारण शोधणे आवश्यक आहे.',
            'कठीण भाग वेगळा करून त्यावर अधिक लक्ष दिल्यास सुधारणा लवकर होऊ शकते.',
            'विश्रांतीही शिकण्याच्या प्रक्रियेचा एक महत्त्वाचा भाग आहे.',
            'थकवा वाढल्यास लक्ष आणि अचूकता कमी होऊ शकते.',
            'स्पष्ट उद्दिष्ट असल्यास सराव अधिक परिणामकारक बनतो.',
            'विद्यार्थ्यांनी आपल्या जुन्या कामगिरीशी सध्याची कामगिरी तुलना करून प्रगती समजून घ्यावी.',
            'इतरांशी अनावश्यक तुलना करण्याऐवजी स्वतःच्या चुका आणि सुधारणा यावर लक्ष केंद्रित करणे चांगले.',
            'सातत्य, संयम, योग्य मार्गदर्शन आणि नियमित सराव यांच्या मदतीने कठीण कौशल्येही हळूहळू आत्मसात करता येतात.'
        ]
    ),
];


/* =========================================================
   HINDI GCC-TBC PASSAGES
========================================================= */

export const GCC_HINDI_PASSAGES: TypingPassage[] = [

    makePassage(
        'gcc-hi-1',
        'कंप्यूटर और आधुनिक जीवन',
        'Technology',
        'Easy',
        'computer and modern life',
        [
            'आज के आधुनिक जीवन में कंप्यूटर का महत्व बहुत बढ़ गया है।',
            'शिक्षा, व्यापार, बैंकिंग, स्वास्थ्य, कार्यालय और मनोरंजन जैसे अनेक क्षेत्रों में कंप्यूटर का उपयोग किया जाता है।',
            'कंप्यूटर की सहायता से बड़ी मात्रा में जानकारी को कम समय में संग्रहित और खोजा जा सकता है।',
            'विद्यार्थी पढ़ाई के लिए शैक्षणिक वेबसाइट, डिजिटल पुस्तकें और विभिन्न कंप्यूटर साधनों का उपयोग करते हैं।',
            'कार्यालयों में पत्र लिखने, रिकॉर्ड रखने, रिपोर्ट तैयार करने और जानकारी व्यवस्थित करने के लिए कंप्यूटर आवश्यक हो गया है।',
            'इंटरनेट की सहायता से लोग दुनिया के अलग-अलग स्थानों की जानकारी कुछ ही क्षणों में प्राप्त कर सकते हैं।',
            'तकनीक का सही उपयोग समय और मेहनत दोनों को बचा सकता है।',
            'लेकिन कंप्यूटर का उपयोग करते समय सुरक्षा का ध्यान रखना भी आवश्यक है।',
            'मजबूत पासवर्ड रखना, अनजान लिंक से बचना और महत्वपूर्ण फाइलों की सुरक्षित प्रतिलिपि रखना अच्छी आदतें हैं।',
            'विद्यार्थियों को कंप्यूटर का उपयोग केवल मनोरंजन के लिए नहीं बल्कि नई जानकारी और कौशल सीखने के लिए करना चाहिए।',
            'टाइपिंग, लेखन, प्रस्तुति, जानकारी खोजना और प्रोग्रामिंग जैसी मूलभूत क्षमताएं भविष्य में उपयोगी हो सकती हैं।',
            'कंप्यूटर अपने आप में अंतिम उद्देश्य नहीं है बल्कि काम को सरल और प्रभावी बनाने का एक साधन है।',
            'नई तकनीक लगातार विकसित हो रही है इसलिए उसके साथ सीखने की आदत बनाए रखना आवश्यक है।',
            'ज्ञान, अभ्यास और जिम्मेदार उपयोग के माध्यम से कंप्यूटर का बेहतर लाभ उठाया जा सकता है।'
        ]
    ),

    makePassage(
        'gcc-hi-2',
        'शिक्षा का महत्व',
        'Literature',
        'Easy',
        'education',
        [
            'शिक्षा व्यक्ति के विकास का एक महत्वपूर्ण साधन है।',
            'शिक्षा से ज्ञान प्राप्त होता है और सही निर्णय लेने की क्षमता विकसित होती है।',
            'विद्यालय और महाविद्यालय विद्यार्थियों को विभिन्न विषयों का ज्ञान प्रदान करते हैं।',
            'पुस्तकों से जानकारी प्राप्त करने के साथ प्रश्न पूछना, चर्चा करना और समस्याओं को हल करना भी सीखा जाता है।',
            'आज के समय में पारंपरिक शिक्षा के साथ डिजिटल शिक्षा का महत्व भी बढ़ रहा है।',
            'कंप्यूटर और इंटरनेट की सहायता से विद्यार्थी विभिन्न विषयों के बारे में जानकारी आसानी से प्राप्त कर सकते हैं।',
            'लेकिन इंटरनेट पर उपलब्ध हर जानकारी सही हो, यह आवश्यक नहीं है।',
            'इसलिए जानकारी के स्रोत की जांच करना और विश्वसनीय सामग्री चुनना जरूरी है।',
            'शिक्षा का उद्देश्य केवल परीक्षा में अच्छे अंक प्राप्त करना नहीं है।',
            'शिक्षा व्यक्ति को जीवन की अलग-अलग परिस्थितियों का सामना करने के लिए भी तैयार करती है।',
            'समय प्रबंधन, संवाद, अनुशासन, सहयोग और जिम्मेदारी जैसे गुण भी शिक्षा के माध्यम से विकसित किए जा सकते हैं।',
            'विद्यार्थियों को अपने पसंदीदा क्षेत्र में लगातार नई चीजें सीखने का प्रयास करना चाहिए।',
            'गलतियों से निराश होने के बजाय उनसे सीखने की आदत बनानी चाहिए।',
            'ज्ञान का सही उपयोग समाज और देश की प्रगति में योगदान दे सकता है।',
            'इसलिए शिक्षा व्यक्तिगत विकास के साथ पूरे समाज के विकास के लिए भी आवश्यक है।'
        ]
    ),

    makePassage(
        'gcc-hi-3',
        'समय प्रबंधन',
        'Business',
        'Medium',
        'time management',
        [
            'समय हर व्यक्ति के लिए बहुत मूल्यवान है।',
            'एक बार बीता हुआ समय वापस नहीं आता इसलिए उपलब्ध समय का सही उपयोग करना आवश्यक है।',
            'विद्यार्थियों के जीवन में पढ़ाई, प्रोजेक्ट, अभ्यास, आराम और व्यक्तिगत कामों के बीच संतुलन बनाना जरूरी होता है।',
            'इसके लिए एक सरल और वास्तविक समय सारणी बनाई जा सकती है।',
            'बड़े काम को छोटे भागों में बांटने से उसे पूरा करना आसान हो जाता है।',
            'उदाहरण के लिए किसी प्रोजेक्ट को जानकारी एकत्र करना, योजना बनाना, लेखन, कोडिंग, परीक्षण और अंतिम जांच जैसे भागों में बांटा जा सकता है।',
            'पढ़ाई के समय मोबाइल की अनावश्यक सूचनाएं और बार-बार काम बदलना ध्यान को प्रभावित कर सकता है।',
            'इसलिए पढ़ाई के दौरान अनावश्यक बाधाओं को कम करना उपयोगी होता है।',
            'कम समय के लेकिन नियमित अध्ययन सत्र कई बार अधिक प्रभावी होते हैं।',
            'पर्याप्त नींद और आराम भी अच्छे समय प्रबंधन का हिस्सा हैं।',
            'दिन के अंत में पूरे किए गए कामों की समीक्षा करने से अगले दिन की योजना बेहतर बनाई जा सकती है।',
            'समय प्रबंधन का अर्थ हर मिनट काम में लगाना नहीं है।',
            'इसका उद्देश्य महत्वपूर्ण कामों को सही समय देना और अचानक आने वाली परिस्थितियों के लिए कुछ समय बचाकर रखना है।',
            'यह आदत विद्यार्थियों को भविष्य के व्यावसायिक जीवन में भी उपयोगी हो सकती है।'
        ]
    ),

    makePassage(
        'gcc-hi-4',
        'भारत का इतिहास',
        'History',
        'Medium',
        'Indian history',
        [
            'भारत का इतिहास बहुत प्राचीन और विविधतापूर्ण है।',
            'भारत में अनेक सभ्यताओं, राजवंशों, भाषाओं और संस्कृतियों का विकास हुआ है।',
            'प्राचीन काल से ही भारत में शिक्षा, व्यापार, कला और विज्ञान की विभिन्न परंपराएं विकसित हुईं।',
            'समय के साथ अनेक राजाओं और साम्राज्यों ने अलग-अलग क्षेत्रों पर शासन किया।',
            'भारत के इतिहास में सामाजिक और सांस्कृतिक परिवर्तन भी महत्वपूर्ण रहे हैं।',
            'स्वतंत्रता आंदोलन ने देश के आधुनिक इतिहास में महत्वपूर्ण भूमिका निभाई।',
            'महात्मा गांधी सहित अनेक नेताओं और स्वतंत्रता सेनानियों ने देश की आजादी के लिए संघर्ष किया।',
            'स्वतंत्रता के बाद भारत ने लोकतांत्रिक व्यवस्था को अपनाया और विकास की दिशा में आगे बढ़ा।',
            'इतिहास का अध्ययन केवल पुरानी घटनाओं को याद करना नहीं है।',
            'इतिहास हमें यह समझने में मदद करता है कि समाज समय के साथ कैसे बदलता है।',
            'किसी ऐतिहासिक घटना को समझने के लिए उस समय की सामाजिक, आर्थिक और राजनीतिक परिस्थितियों को जानना भी आवश्यक है।',
            'इतिहास से मिलने वाली सीख वर्तमान में बेहतर निर्णय लेने में सहायता कर सकती है।',
            'विद्यार्थियों को इतिहास को केवल परीक्षा का विषय न मानकर समाज और देश को समझने का माध्यम मानना चाहिए।',
            'इतिहास की समझ नागरिकों में जिम्मेदारी और जागरूकता की भावना को मजबूत कर सकती है।'
        ]
    ),

    makePassage(
        'gcc-hi-5',
        'पर्यावरण संरक्षण',
        'Science',
        'Hard',
        'environment protection',
        [
            'पर्यावरण का संतुलन मानव जीवन के लिए बहुत आवश्यक है।',
            'हवा, पानी, मिट्टी, पेड़-पौधे, पशु और प्राकृतिक संसाधन एक-दूसरे से जुड़े हुए हैं।',
            'बढ़ती जनसंख्या, औद्योगिकीकरण और अधिक कचरे के कारण पर्यावरण पर दबाव बढ़ रहा है।',
            'वायु प्रदूषण का प्रभाव मानव स्वास्थ्य पर पड़ सकता है।',
            'जल प्रदूषण से मनुष्य के साथ जल में रहने वाले जीवों को भी नुकसान हो सकता है।',
            'प्लास्टिक का अत्यधिक उपयोग और कचरे का गलत प्रबंधन भी गंभीर समस्याएं हैं।',
            'पर्यावरण की रक्षा के लिए प्रत्येक व्यक्ति को अपनी दैनिक आदतों में कुछ बदलाव करने चाहिए।',
            'पानी बचाना, बिजली का सही उपयोग करना, कचरे को अलग करना और वस्तुओं का पुनः उपयोग करना उपयोगी कदम हैं।',
            'पेड़ लगाना और उनकी देखभाल करना भी पर्यावरण के लिए महत्वपूर्ण है।',
            'विद्यालयों और महाविद्यालयों में विद्यार्थियों को पर्यावरण के प्रति जागरूक करना चाहिए।',
            'सरकार, उद्योग और नागरिक मिलकर काम करें तो प्रदूषण को कम करने में सहायता मिल सकती है।',
            'विकास करते समय प्राकृतिक संसाधनों का जिम्मेदारी से उपयोग करना जरूरी है।',
            'आज लिए गए निर्णय भविष्य की पीढ़ियों को प्रभावित करते हैं।',
            'इसलिए पर्यावरण संरक्षण केवल सरकार की जिम्मेदारी नहीं बल्कि समाज के प्रत्येक व्यक्ति की साझा जिम्मेदारी है।'
        ]
    ),

    makePassage(
        'gcc-hi-6',
        'पढ़ने की आदत',
        'Literature',
        'Easy',
        'reading habit',
        [
            'पढ़ने की आदत ज्ञान प्राप्त करने का एक अच्छा माध्यम है।',
            'नियमित पढ़ने से शब्दावली बढ़ती है, विचार करने की क्षमता बेहतर होती है और भाषा पर पकड़ मजबूत होती है।',
            'विद्यार्थी पाठ्यपुस्तक, कहानी, समाचार पत्र, संदर्भ पुस्तक और विभिन्न लेख पढ़ सकते हैं।',
            'हर प्रकार के पढ़ने का उद्देश्य अलग हो सकता है।',
            'अध्ययन करते समय मुख्य बातों को समझना और महत्वपूर्ण जानकारी को याद रखना जरूरी है।',
            'कठिन शब्द मिलने पर उनका अर्थ समझकर दोबारा पढ़ने से विषय अधिक स्पष्ट हो सकता है।',
            'पढ़े हुए विषय का अपने शब्दों में सार लिखना भी एक उपयोगी अभ्यास है।',
            'डिजिटल साधनों के कारण आज बहुत सारी किताबें और जानकारी आसानी से उपलब्ध हैं।',
            'लेकिन मोबाइल या कंप्यूटर पर पढ़ते समय दूसरी सूचनाओं के कारण ध्यान भटक सकता है।',
            'इसलिए पढ़ने के लिए शांत स्थान और निश्चित समय चुनना अच्छा होता है।',
            'हर दिन कुछ पन्ने पढ़ने से धीरे-धीरे एक मजबूत आदत बन सकती है।',
            'पढ़ने से भाषा के साथ-साथ अलग-अलग विषयों के बारे में जिज्ञासा भी बढ़ती है।',
            'विद्यार्थियों को अपनी रुचि के विषय खोजकर उनके बारे में अधिक पढ़ना चाहिए।',
            'नियमित पढ़ने की आदत पढ़ाई के कई विषयों को समझने में सहायता करती है और स्वतंत्र रूप से सीखने की क्षमता बढ़ाती है।'
        ]
    ),

    makePassage(
        'gcc-hi-7',
        'विज्ञान और तकनीक',
        'Technology',
        'Medium',
        'science and technology',
        [
            'विज्ञान और तकनीक ने मानव जीवन में अनेक महत्वपूर्ण परिवर्तन किए हैं।',
            'वैज्ञानिक अनुसंधान से प्रकृति और हमारे आसपास होने वाली कई प्रक्रियाओं को समझने में सहायता मिली है।',
            'तकनीक की मदद से वैज्ञानिक ज्ञान का उपयोग विभिन्न समस्याओं के समाधान के लिए किया जाता है।',
            'स्वास्थ्य के क्षेत्र में आधुनिक उपकरणों से रोगों की जांच और उपचार अधिक प्रभावी हुए हैं।',
            'कृषि में नई तकनीक, मशीन और मौसम की जानकारी का उपयोग उत्पादन बढ़ाने के लिए किया जाता है।',
            'मोबाइल और इंटरनेट ने संचार को तेज और सरल बना दिया है।',
            'कंप्यूटर की सहायता से जानकारी का विश्लेषण और प्रबंधन कम समय में किया जा सकता है।',
            'अंतरिक्ष अनुसंधान से पृथ्वी और ब्रह्मांड के बारे में हमारा ज्ञान बढ़ा है।',
            'तकनीक के कई लाभ हैं लेकिन इसका जिम्मेदारी से उपयोग करना भी आवश्यक है।',
            'गलत जानकारी, निजी जानकारी की सुरक्षा और डिजिटल धोखाधड़ी जैसी समस्याओं को समझना जरूरी है।',
            'विद्यार्थियों को तकनीक का उपयोग केवल मनोरंजन के लिए नहीं बल्कि ज्ञान और कौशल बढ़ाने के लिए करना चाहिए।',
            'विज्ञान हमें प्रश्न पूछने और प्रमाण के आधार पर निष्कर्ष निकालने की आदत सिखाता है।',
            'नई तकनीक सीखने के लिए अभ्यास और जिज्ञासा दोनों आवश्यक हैं।',
            'विज्ञान और तकनीक का सही उपयोग समाज के विकास और लोगों के जीवन को बेहतर बनाने में महत्वपूर्ण योगदान दे सकता है।'
        ]
    ),

    makePassage(
        'gcc-hi-8',
        'आधुनिक शहरों का विकास',
        'History',
        'Medium',
        'urban development',
        [
            'आधुनिक शहरों का विकास परिवहन, व्यापार, उद्योग और रोजगार के अवसरों से जुड़ा हुआ है।',
            'लोग अक्सर उन स्थानों पर रहना पसंद करते हैं जहां शिक्षा, स्वास्थ्य, बाजार और रोजगार की सुविधाएं उपलब्ध हों।',
            'शहर की जनसंख्या बढ़ने के साथ सड़क, पानी, बिजली, सार्वजनिक परिवहन और कचरा प्रबंधन जैसी सुविधाओं की आवश्यकता बढ़ती है।',
            'यदि शहर का विकास बिना योजना के हो तो यातायात, प्रदूषण और पानी जैसी समस्याएं बढ़ सकती हैं।',
            'इसलिए शहर के विकास के लिए लंबे समय की योजना बनाना आवश्यक है।',
            'अच्छी सार्वजनिक परिवहन व्यवस्था से सड़कों पर वाहनों की संख्या कम करने में मदद मिल सकती है।',
            'पार्क, खुले मैदान और पैदल चलने के रास्ते लोगों के जीवन को अधिक सुविधाजनक बनाते हैं।',
            'तकनीक की सहायता से यातायात और सार्वजनिक सेवाओं को बेहतर ढंग से प्रबंधित किया जा सकता है।',
            'नागरिकों को भी सार्वजनिक स्थानों की स्वच्छता और सुरक्षा बनाए रखने में सहयोग करना चाहिए।',
            'पानी और ऊर्जा जैसे संसाधनों का उपयोग सावधानी से करना आवश्यक है।',
            'शहर का विकास केवल नई इमारतें बनाने का नाम नहीं है।',
            'लोगों को सुरक्षित, स्वच्छ और सुविधाजनक जीवन देना विकास का महत्वपूर्ण उद्देश्य है।',
            'सरकार, व्यवसाय और नागरिक मिलकर काम करें तो शहरों का विकास अधिक संतुलित और टिकाऊ बनाया जा सकता है।'
        ]
    ),

    makePassage(
        'gcc-hi-9',
        'व्यवसाय और कौशल',
        'Business',
        'Hard',
        'business and skills',
        [
            'सफल व्यवसाय के लिए अच्छी योजना, उपयोगी कौशल और ग्राहकों की जरूरतों को समझना आवश्यक है।',
            'किसी भी व्यवसाय में उत्पाद की गुणवत्ता और भरोसेमंद सेवा का विशेष महत्व होता है।',
            'सही कीमत और अच्छी ग्राहक सेवा से लोगों का विश्वास बढ़ाया जा सकता है।',
            'व्यवसाय चलाते समय आय और खर्च का सही रिकॉर्ड रखना जरूरी है।',
            'तकनीक की सहायता से बिक्री, सामान का रिकॉर्ड, ग्राहक सेवा और भुगतान जैसे कामों को व्यवस्थित किया जा सकता है।',
            'लेकिन हर तकनीकी साधन का उपयोग व्यवसाय की वास्तविक आवश्यकता के अनुसार होना चाहिए।',
            'अच्छा संवाद और टीमवर्क किसी भी संस्था के लिए महत्वपूर्ण है।',
            'कर्मचारी यदि स्पष्ट रूप से एक-दूसरे से बात करें तो काम में होने वाली गलतियां कम की जा सकती हैं।',
            'बदलती परिस्थितियों के अनुसार नई पद्धतियों को अपनाने की तैयारी भी जरूरी है।',
            'प्रतिस्पर्धा बढ़ने के कारण ग्राहकों को बेहतर सेवा देना पहले से अधिक महत्वपूर्ण हो गया है।',
            'छोटे व्यवसाय भी डिजिटल साधनों की सहायता से नए ग्राहकों तक पहुंच सकते हैं।',
            'सफलता के लिए केवल तेजी से काम करना पर्याप्त नहीं है।',
            'काम की गुणवत्ता, ईमानदारी, समय का सही उपयोग और ग्राहकों का सम्मान भी आवश्यक है।',
            'जो व्यवसाय लगातार अपने कौशल और कार्यप्रणाली में सुधार करता है उसके लंबे समय तक सफल रहने की संभावना अधिक होती है।'
        ]
    ),

    makePassage(
        'gcc-hi-10',
        'निरंतर अभ्यास का महत्व',
        'Science',
        'Hard',
        'consistent practice',
        [
            'नई क्षमता सीखना एक धीरे-धीरे आगे बढ़ने वाली प्रक्रिया है।',
            'शुरुआत में गलतियां होना सामान्य है क्योंकि मस्तिष्क नई जानकारी और गतिविधियों को समझने का प्रयास करता है।',
            'गलतियों को पहचानकर उनमें सुधार करना सीखने का महत्वपूर्ण हिस्सा है।',
            'एक ही गलती को बार-बार दोहराने के बजाय उसके कारण को समझकर कठिन भाग का अलग से अभ्यास करना उपयोगी होता है।',
            'लंबे समय तक कभी-कभी अभ्यास करने की तुलना में कम समय लेकिन नियमित अभ्यास अधिक आसानी से जारी रखा जा सकता है।',
            'स्पष्ट लक्ष्य होने से अभ्यास अधिक प्रभावी बनता है।',
            'उदाहरण के लिए टाइपिंग सीखते समय विद्यार्थी पहले सही अक्षर और उंगली की स्थिति पर ध्यान दे सकता है।',
            'इसके बाद शब्दों की गति, वाक्यों की लय और अंत में कुल टाइपिंग गति पर काम किया जा सकता है।',
            'प्रगति को सटीकता, समय और शब्द प्रति मिनट जैसे मापों से देखा जा सकता है।',
            'अपनी वर्तमान क्षमता की तुलना पुराने परिणामों से करने पर सुधार को आसानी से समझा जा सकता है।',
            'थकान बढ़ने पर ध्यान और सटीकता कम हो सकती है इसलिए पर्याप्त आराम भी जरूरी है।',
            'अच्छा मार्गदर्शन और उपयोगी प्रतिक्रिया सीखने की प्रक्रिया को बेहतर बना सकते हैं।',
            'चाहे कौशल टाइपिंग, प्रोग्रामिंग, गणित या किसी अन्य विषय का हो, धैर्य और निरंतर अभ्यास महत्वपूर्ण हैं।',
            'नियमित प्रयास, गलतियों से सीखने और सही तरीके में बदलाव करने की आदत कठिन कौशलों को भी धीरे-धीरे आसान बना सकती है।'
        ]
    ),
];


/* =========================================================
   LANGUAGE HELPER
========================================================= */

export const getGCCPassagesByLanguage = (
    language: 'English' | 'Marathi' | 'Hindi'
): TypingPassage[] => {

    switch (language) {

        case 'Marathi':
            return GCC_MARATHI_PASSAGES;

        case 'Hindi':
            return GCC_HINDI_PASSAGES;

        case 'English':
        default:
            return GCC_PASSAGES;
    }
};