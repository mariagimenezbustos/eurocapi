import "./Home.css";
import { Link } from "react-router-dom"

function Home() {

    return (
        <div>
            <div className="main">
                <h1 className="title">WELCOME TO EUROCAPI</h1>
                <h2 className="title">Your Gateway to European Capitals and Beyond!</h2>
                <div className="text">
                    <h3>
                        🌍 Explore the Heart of Europe, One Capital at a Time 🏰
                    </h3>
                    <p>
                        Embark on a captivating journey through the enchanting tapestry of Europe's vibrant capitals with Eurocapi! Whether you're a seasoned traveler or an armchair explorer, Eurocapi is your ultimate destination for unraveling the rich tapestry of culture, history, and experiences that make each European capital unique.
                    </p>
                </div>
                <div className="text">
                    <h3>
                        🏛️ Discover the Essence of Each Capital:
                    </h3>
                    <p>
                        Immerse yourself in the allure of iconic landmarks, diverse cultures, and captivating histories. Delve into a treasure trove of meticulously curated information about official languages, populations, and countries, providing you with the essential insights to grasp the essence of every capital.
                    </p>
                </div>
                <div className="text">
                    <h3>
                        🗺️ Navigate Like a Local:
                    </h3>
                    <p>
                        Unearth the hidden gems that locals adore, from quaint cafes tucked away on charming cobblestone streets to awe-inspiring viewpoints that offer panoramic vistas of urban landscapes. Our community-driven platform empowers travelers and residents alike to share their personal recommendations, turning your visit into an authentic and unforgettable adventure.
                    </p>
                </div>
                <div className="text">
                    <h3>
                        🌆 Live Through Shared Experiences:
                    </h3>
                    <p>
                        Engage with firsthand accounts from fellow travelers and city dwellers. Uncover valuable tips, heartwarming stories, and unforgettable moments that provide an intimate glimpse into daily life across Europe's bustling metropolises. Join the conversation, ask questions, and forge connections that transcend borders.
                    </p>
                </div>
                <div className="text">
                    <h3>
                        📢 Become Part of the Eurocapi Community:
                    </h3>
                    <p>
                        Embrace the spirit of wanderlust and cultural curiosity by contributing your own tales, insights, and advice. Share your escapades, must-see attractions, and hidden treasures that left you awe-inspired. Connect with kindred spirits, both near and far, who share your passion for exploration.
                    </p>
                </div>
                <div className="text">
                    <h3>
                        🎉 Start Your Eurocapi Adventure Today:
                    </h3>
                    <p>
                        Embark on a virtual expedition that transports you to the heart of Europe's capitals. Let Eurocapi be your compass, guiding you through the rich mosaic of languages, traditions, and experiences that shape these dynamic cities. Whether you're plotting your next grand adventure or simply indulging in armchair exploration, Eurocapi invites you to embrace the magic and diversity that define Europe's most captivating capitals. Join us in celebrating the art of discovery and the thrill of venturing into the unknown.
                    </p>
                </div>
                <p className="end">
                    Begin your Eurocapi journey now and let the capitals of Europe captivate your senses! 🗺️🏙️🌍
                </p>
                <Link className="link" to="/capitals">Start Exploring Capitals</Link>
            </div>
        </div>
    )
}

export default Home;