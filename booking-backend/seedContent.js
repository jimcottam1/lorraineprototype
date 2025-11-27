const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Program = require('./models/Program');
const Testimonial = require('./models/Testimonial');
const SiteSettings = require('./models/SiteSettings');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('✅ Connected to MongoDB');
    seedData();
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

async function seedData() {
    try {
        console.log('🌱 Seeding content data...');

        // Clear existing content
        await Program.deleteMany({});
        await Testimonial.deleteMany({});
        await SiteSettings.deleteMany({});

        // Seed Programs
        const programs = [
            {
                id: 'wellness',
                type: '4-week',
                name: 'Your Path to Wellness',
                description: 'Reduce stress, prevent burnout, complement traditional healthcare, reduce symptoms of depression & anxiety, improve sleep and more. Each week follows the themes: Allow, Trust, Connect, and Release.',
                duration: '4-Week Program',
                price: '£256',
                features: [
                    '4 weekly 60-minute sessions (45 min Reiki + feedback)',
                    'Daily guided meditations (5, 8, 12, 15 mins)',
                    'Health questionnaire & progress reviews',
                    'Plus 10% discount for Reiki for beginners workshop'
                ],
                order: 0,
                active: true
            },
            {
                id: 'weightloss',
                type: '4-week',
                name: 'Your Path to Wellbeing & Weight Loss',
                description: 'Boost your energy & transform your body with this holistic approach to weight loss through Reiki. Japanese energy healing supporting Allow, Trust, Connect, and Release.',
                duration: '4-Week Program',
                price: '£256',
                caseStudyPrice: '£80',
                features: [
                    '4 weekly 75-minute sessions (45 min Reiki)',
                    'Daily guided meditations (5, 8, 12, 15 mins)',
                    'Energy transformation & emotional weight release',
                    'Address energetic blocks & old patterns'
                ],
                featured: true,
                badge: 'Popular',
                order: 1,
                active: true
            },
            {
                id: 'menopause',
                type: '4-week',
                name: 'Your Pathway Through Menopause',
                description: 'Allow Reiki to help reduce the symptoms, accept the change, and release burdens and emotions that no longer serve you. Journey through Acceptance, Release, Connect, and Renew.',
                duration: '4-Week Program',
                price: '£256',
                caseStudyPrice: '£100',
                features: [
                    '4 weekly 75-minute sessions (45 min Reiki)',
                    'Daily guided meditations (5, 8, 12, 15 mins)',
                    'Emotional grounding & energy cleansing',
                    'Reconnect with your true self & radiant presence'
                ],
                order: 2,
                active: true
            },
            {
                id: 'experience',
                type: 'single-session',
                name: 'Experience Reiki',
                description: 'Not sure if Reiki is for you? Try a single session to experience the healing power of Reiki before committing to a full program.',
                duration: 'Single 60-Minute Session',
                price: '£64',
                features: [
                    '60-minute session (45 min Reiki + feedback)',
                    'Introduction to Reiki energy healing',
                    'Personalized assessment and recommendations',
                    'Perfect for first-time clients',
                    'Can be applied toward a 4-week program'
                ],
                badge: 'Try Reiki',
                order: 0,
                active: true
            },
            {
                id: 'solo',
                type: 'single-session',
                name: 'Solo Follow-Up Session',
                description: 'For clients who have completed a 4-week pathway and want to continue their wellness practice with individual sessions.',
                duration: 'Single 60-Minute Session',
                price: '£70',
                features: [
                    '60-minute session (45 min Reiki + feedback)',
                    'Maintain your wellness momentum',
                    'Address specific challenges or goals',
                    'Flexible scheduling as needed',
                    'For past pathway program clients'
                ],
                badge: 'Continue Your Journey',
                order: 1,
                active: true
            },
            {
                id: 'reiki1',
                type: 'course',
                name: 'Reiki Level One Attunement',
                description: 'Begin your journey as a Reiki practitioner. Learn the fundamentals of Reiki, hand positions, self-healing techniques, and receive your first attunement.',
                duration: 'Full Day Course',
                price: 'Contact for Pricing',
                features: [
                    'Understanding Reiki energy',
                    'Hand positions & techniques',
                    'Self-healing practices',
                    'Level One attunement ceremony'
                ],
                order: 0,
                active: true
            },
            {
                id: 'reiki2',
                type: 'course',
                name: 'Reiki Level Two Attunement',
                description: 'Deepen your practice with sacred symbols, distance healing, and advanced techniques. Perfect for those who have completed Reiki One.',
                duration: 'Full Day Course',
                price: 'Contact for Pricing',
                features: [
                    'Three sacred Reiki symbols',
                    'Distance healing techniques',
                    'Mental & emotional healing',
                    'Level Two attunement ceremony'
                ],
                order: 1,
                active: true
            }
        ];

        await Program.insertMany(programs);
        console.log(`✅ Seeded ${programs.length} programs`);

        // Seed Testimonials
        const testimonials = [
            {
                text: 'I am new to Reiki which has given me new energy, a feeling of calm, and made me feel better about myself.',
                author: 'John',
                program: 'Path to Wellness Program',
                order: 0,
                active: true
            },
            {
                text: 'Each session was different in experience and emotion. I had hoped I would benefit from it in some way, and I definitely can say that I did.',
                author: 'Sarah',
                year: '2025',
                program: 'Pathway Through Menopause Program',
                order: 1,
                active: true
            }
        ];

        await Testimonial.insertMany(testimonials);
        console.log(`✅ Seeded ${testimonials.length} testimonials`);

        // Seed Site Settings
        const siteSettings = new SiteSettings({
            _id: 'site-settings',
            siteTitle: 'Reiki - Your Path to Wellness',
            tagline: 'Begin Your Journey to Wellness',
            heroDescription: 'Experience the healing power of Reiki through our personalized 4-week treatment plans',
            phone: '07846633248',
            location: 'Wallington',
            businessName: 'Happiness in Harmony',
            businessTagline: 'Counselling, Reiki, Coaching',
            practitionerName: 'Lorraine Turner',
            practitionerPhoto: 'images/lorraine-portrait.jpg',
            whatIsReiki: 'Reiki is a gentle, non-invasive healing practice that promotes balance and wellness. It can work alongside or as an alternative to traditional medical approaches, supporting your body\'s natural healing abilities.',
            reikiDisclaimer: 'Reiki is complementary to medical treatment and should not replace advice from your doctor.',
            facebookUrl: 'https://www.facebook.com/profile.php?id=61581203812442',
            instagramUrl: 'https://www.instagram.com/happinessinreiki',
            instagramHandle: '@happinessinreiki',
            mainWebsiteUrl: 'https://happinessinharmony.co.uk',
            introVideoUrl: 'media/intro-video.mp4',
            meditationAudioUrl: 'media/sample-meditation.mp3',
            chakraImageUrl: 'images/chakra-body.png'
        });

        await siteSettings.save();
        console.log('✅ Seeded site settings');

        console.log('\n🎉 Content seeding completed successfully!\n');
        console.log('You can now:');
        console.log('1. Start the backend server: npm start');
        console.log('2. Login to admin panel at /admin');
        console.log('3. Manage all content through the admin interface\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding content:', error);
        process.exit(1);
    }
}
