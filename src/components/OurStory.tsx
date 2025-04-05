import React, { useEffect, useRef } from 'react';
import './OurStory.css';
import bridgertonImage from '../assets/images/bridgerton.jpg';
import halloweenImage from '../assets/images/halloween.jpg';

interface TimelineEvent {
  title: string;
  date: string;
  description: string;
  image: string;
}

const OurStory: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      title: 'How We Met',
      date: 'March 2023',
      description: 'Gym rizz.',
      image: bridgertonImage
    },
    {
      title: 'Something important!',
      date: 'August 2023',
      description: 'If you didn\'t register it by now, I don\'t have many of pictures of the two of y\'all.',
      image: halloweenImage
    },
    {
      title: 'The Proposal',
      date: 'March 2024',
      description: 'Da jefferson memorial!',
      image: bridgertonImage
    }
  ];

  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Store current refs in a variable to use in cleanup
    const currentRefs = timelineRefs.current;

    currentRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="our-story" id="our-story">
      <h2 className="section-title">Our Story</h2>
      <div className="timeline">
        {timelineEvents.map((event, index) => (
          <div 
            key={index} 
            className={`timeline-event ${index % 2 === 0 ? 'left' : 'right'}`}
            ref={el => {
              timelineRefs.current[index] = el;
              return undefined;
            }}
          >
            <div className="timeline-content">
              <h3>{event.title}</h3>
              <p className="date">{event.date}</p>
              <div className="image-container">
                <img src={event.image} alt={event.title} />
              </div>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
