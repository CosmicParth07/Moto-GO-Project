import { useState } from 'react'

// Features data
const features = [
  {
    id: "01",
    title: "Easy Booking",
    text: "Choose your bike and fill a simple booking form."
  },
  {
    id: "02",
    title: "Student Friendly",
    text: "Simple plans and affordable hourly rental prices."
  },
  {
    id: "03",
    title: "Good Bikes",
    text: "Our bikes are checked before they are given for a ride."
  }
]

// Steps data
const steps = [
  {
    number: 1,
    title: "Select a bike",
    text: "Choose Mountain, Sports or Electric."
  },
  {
    number: 2,
    title: "Pick your dates",
    text: "Select pickup and return dates."
  },
  {
    number: 3,
    title: "Confirm booking",
    text: "Submit the form and get your ride."
  }
]

// Component 1: Hero
function Hero() {
  const [user] = useState(() => {
    const data = localStorage.getItem("motogoCurrentUser")
    return data ? JSON.parse(data) : null
  })

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="small-title">SIMPLE • AFFORDABLE • EASY</p>

        {user && (
          <p className="small-title">
            WELCOME BACK, {user.name.toUpperCase()}!
          </p>
        )}

        <h1>Rent a Bike.<br />Ride the City.</h1>

        <p className="hero-description">
          Need a bike for college, a short trip or a weekend ride?
          Choose a bike, select your dates and start your ride.
        </p>

        <a href="/Code/Bikes.html" className="btn-primary">
          Browse Bikes
        </a>
      </div>

      <div className="hero-img">
        <img src="/Code/Images/motogo.png" alt="Bike for rent" />
      </div>
    </section>
  )
}

// Component 2: Feature Card
function FeatureCard(props) {
  return (
    <div className="card">
      <div className="card-icon">{props.id}</div>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  )
}

// Component 3: Features
function Features() {
  return (
    <section className="features">
      <div className="section-title">
        <p className="small-title">WHY MOTOGO?</p>
        <h2>Everything you need for an easy ride</h2>
      </div>

      <div className="feature-cards">
        {features.map(function (item) {
          return (
            <FeatureCard
              key={item.id}
              id={item.id}
              title={item.title}
              text={item.text}
            />
          )
        })}
      </div>
    </section>
  )
}

// Component 4: Single Step
function Step(props) {
  return (
    <div className="step">
      <div className="step-number">{props.number}</div>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  )
}

// Component 5: Steps
function Steps() {
  return (
    <section className="steps">
      <div className="section-title">
        <p className="small-title">HOW IT WORKS</p>
        <h2>Three simple steps</h2>
      </div>

      <div className="steps-container">
        {steps.map(function (item) {
          return (
            <Step
              key={item.number}
              number={item.number}
              title={item.title}
              text={item.text}
            />
          )
        })}
      </div>
    </section>
  )
}

// Main App Component
function App() {
  return (
    <>
      <Hero />
      <Features />
      <Steps />
    </>
  )
}

export default App