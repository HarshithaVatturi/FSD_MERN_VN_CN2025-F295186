const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const books = [
    // --- FINANCE ---
    {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 399,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/12693998-L.jpg",
        description: "Doing well with money isn't necessarily about what you know. It's about how you behave.",
        publication: "Harriman House",
        rating: 4.8
    },
    {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 450,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/8340799-L.jpg",
        description: "What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
        publication: "Plata Publishing",
        rating: 4.6
    },
    {
        title: "The Intelligent Investor",
        author: "Benjamin Graham",
        price: 599,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/10599144-L.jpg",
        description: "The definitive book on value investing.",
        publication: "Harper Business",
        rating: 4.7
    },
    {
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        price: 199,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/6423924-L.jpg",
        description: "The landmark bestseller now revised and updated for the 21st century.",
        publication: "TarcherPerigee",
        rating: 4.5
    },
    {
        title: "I Will Teach You to Be Rich",
        author: "Ramit Sethi",
        price: 499,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/8353683-L.jpg",
        description: "No Guilt. No Excuses. No BS. Just a 6-Week Program That Works.",
        publication: "Workman Publishing",
        rating: 4.8
    },
    {
        title: "Zero to One",
        author: "Peter Thiel",
        price: 550,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/8364849-L.jpg",
        description: "Notes on Startups, or How to Build the Future.",
        publication: "Crown Currency",
        rating: 4.6
    },
    {
        title: "Principles",
        author: "Ray Dalio",
        price: 899,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/12833076-L.jpg",
        description: "Life and Work by one of the world's most successful investors.",
        publication: "Simon & Schuster",
        rating: 4.7
    },
    {
        title: "Money: Master the Game",
        author: "Tony Robbins",
        price: 699,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/8299292-L.jpg",
        description: "7 Simple Steps to Financial Freedom.",
        publication: "Simon & Schuster",
        rating: 4.5
    },
    {
        title: "Freakonomics",
        author: "Steven D. Levitt",
        price: 399,
        category: "Finance",
        image: "https://covers.openlibrary.org/b/id/8228789-L.jpg",
        description: "A Rogue Economist Explores the Hidden Side of Everything.",
        publication: "William Morrow",
        rating: 4.7
    },

    // --- SELF HELP ---
    {
        title: "Atomic Habits",
        author: "James Clear",
        price: 550,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/10505143-L.jpg",
        description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
        publication: "Penguin",
        rating: 4.9
    },
    {
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        price: 399,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/12836233-L.jpg",
        description: "A Counterintuitive Approach to Living a Good Life.",
        publication: "Harper",
        rating: 4.4
    },
    {
        title: "Ikigai",
        author: "Hector Garcia",
        price: 499,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/12638840-L.jpg",
        description: "The Japanese Secret to a Long and Happy Life.",
        publication: "Penguin Life",
        rating: 4.6
    },
    {
        title: "Deep Work",
        author: "Cal Newport",
        price: 450,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/12629631-L.jpg",
        description: "Rules for Focused Success in a Distracted World.",
        publication: "Grand Central",
        rating: 4.7
    },
    {
        title: "Can't Hurt Me",
        author: "David Goggins",
        price: 699,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/12888636-L.jpg",
        description: "Master Your Mind and Defy the Odds.",
        publication: "Lioncrest",
        rating: 4.9
    },
    {
        title: "Start With Why",
        author: "Simon Sinek",
        price: 420,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/6966113-L.jpg",
        description: "How Great Leaders Inspire Everyone to Take Action.",
        publication: "Portfolio",
        rating: 4.6
    },
    {
        title: "Limitless",
        author: "Jim Kwik",
        price: 599,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/12586675-L.jpg",
        description: "Upgrade Your Brain, Learn Anything Faster, and Unlock Your Exceptional Life.",
        publication: "Hay House",
        rating: 4.7
    },
    {
        title: "The Power of Now",
        author: "Eckhart Tolle",
        price: 350,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/8404229-L.jpg",
        description: "A Guide to Spiritual Enlightenment.",
        publication: "New World Library",
        rating: 4.6
    },
    {
        title: "Mindset",
        author: "Carol S. Dweck",
        price: 499,
        category: "Self Help",
        image: "https://covers.openlibrary.org/b/id/8229869-L.jpg",
        description: "The New Psychology of Success.",
        publication: "Ballantine Books",
        rating: 4.7
    },

    // --- HORROR ---
    {
        title: "It",
        author: "Stephen King",
        price: 799,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/14541523-L.jpg",
        description: "The terror began in 1958 and ended in 1985.",
        publication: "Viking",
        rating: 4.8
    },
    {
        title: "The Shining",
        author: "Stephen King",
        price: 599,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/6498446-L.jpg",
        description: "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start.",
        publication: "Doubleday",
        rating: 4.9
    },
    {
        title: "Dracula",
        author: "Bram Stoker",
        price: 299,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/10602787-L.jpg",
        description: "The classic vampire novel.",
        publication: "Archibald Constable",
        rating: 4.6
    },
    {
        title: "Bird Box",
        author: "Josh Malerman",
        price: 450,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/8276662-L.jpg",
        description: "Something is out there that must not be seen.",
        publication: "Ecco",
        rating: 4.4
    },
    {
        title: "Pet Sematary",
        author: "Stephen King",
        price: 550,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/10582030-L.jpg",
        description: "Sometimes dead is better.",
        publication: "Doubleday",
        rating: 4.5
    },
    {
        title: "The Exorcist",
        author: "William Peter Blatty",
        price: 499,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/10512803-L.jpg",
        description: "Inspired by a true story of a child's demonic possession.",
        publication: "Harper",
        rating: 4.6
    },
    {
        title: "Mexican Gothic",
        author: "Silvia Moreno-Garcia",
        price: 599,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/11467475-L.jpg",
        description: "A reimagining of the classic gothic suspense novel.",
        publication: "Del Rey",
        rating: 4.3
    },
    {
        title: "Carrie",
        author: "Stephen King",
        price: 350,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/10515152-L.jpg",
        description: "The story of a misfit high-school girl who discovers she has telekinetic powers.",
        publication: "Doubleday",
        rating: 4.4
    },
    {
        title: "Frankenstein",
        author: "Mary Shelley",
        price: 250,
        category: "Horror",
        image: "https://covers.openlibrary.org/b/id/12456070-L.jpg",
        description: "The story of Victor Frankenstein who creates a grotesque creature.",
        publication: "Lackington",
        rating: 4.5
    },

    // --- ROMCOM ---
    {
        title: "The Hating Game",
        author: "Sally Thorne",
        price: 399,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/8276020-L.jpg",
        description: "A sharp and sexy comedy about two co-workers who can't stand each other.",
        publication: "William Morrow",
        rating: 4.3
    },
    {
        title: "Beach Read",
        author: "Emily Henry",
        price: 450,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/10574828-L.jpg",
        description: "A romance writer who no longer believes in love.",
        publication: "Berkley",
        rating: 4.5
    },
    {
        title: "Book Lovers",
        author: "Emily Henry",
        price: 499,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/12662243-L.jpg",
        description: "A cutthroat literary agent meets a brooding editor.",
        publication: "Berkley",
        rating: 4.7
    },
    {
        title: "Red, White & Royal Blue",
        author: "Casey McQuiston",
        price: 550,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/12555567-L.jpg",
        description: "What happens when America's First Son falls in love with the Prince of Wales?",
        publication: "St. Martin's Griffin",
        rating: 4.8
    },
    {
        title: "The Spanish Love Deception",
        author: "Elena Armas",
        price: 420,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/12818274-L.jpg",
        description: "A fake dating romance that takes them to Spain.",
        publication: "Simon & Schuster",
        rating: 4.2
    },
    {
        title: "It Ends with Us",
        author: "Colleen Hoover",
        price: 499,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/10582531-L.jpg",
        description: "Sometimes it is the one who loves you who hurts you the most.",
        publication: "Atria",
        rating: 4.6
    },
    {
        title: "The Unhoneymooners",
        author: "Christina Lauren",
        price: 380,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/14547539-L.jpg",
        description: "For two sworn enemies, anything can happen during the Hawaiian trip of a lifetime.",
        publication: "Gallery Books",
        rating: 4.4
    },
    {
        title: "Love Hypothesis",
        author: "Ali Hazelwood",
        price: 450,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/12470650-L.jpg",
        description: "When a fake relationship between scientists meets the irresistible force of attraction.",
        publication: "Berkley",
        rating: 4.7
    },
    {
        title: "Eleanor Oliphant Is Completely Fine",
        author: "Gail Honeyman",
        price: 399,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/10526732-L.jpg",
        description: "A smart, warm, and uplifting story of an out-of-the-ordinary heroine.",
        publication: "Pamela Dorman Books",
        rating: 4.5
    },
    {
        title: "Crazy Rich Asians",
        author: "Kevin Kwan",
        price: 499,
        category: "RomCom",
        image: "https://covers.openlibrary.org/b/id/12108153-L.jpg",
        description: "A novel about three super-rich, pedigreed Chinese families.",
        publication: "Doubleday",
        rating: 4.3
    }
];

const importData = async () => {
    try {
        await Book.deleteMany(); // Clear existing
        await Book.insertMany(books); // Insert books
        console.log('Data Imported Sucessfully! (Real Covers)');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
