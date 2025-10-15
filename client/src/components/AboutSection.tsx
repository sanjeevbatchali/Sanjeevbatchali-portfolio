export default function AboutSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-4xl w-full">
        <h2 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-12 text-center" data-testid="text-about-heading">
          About Me
        </h2>
        
        {/* VERSION 1 - Balanced Professional & Personal */}
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p data-testid="text-about-intro">
            I'm a finance professional who believes that numbers tell stories worth sharing. With a strong foundation as a <span className="font-semibold text-foreground">Chartered Accountant</span> and expertise in <span className="font-semibold text-foreground">data analytics</span>, I help organizations make informed decisions through financial modeling, valuations, and strategic insights. I'm particularly passionate about being part of the <span className="font-semibold text-foreground">Transaction Advisory</span> ecosystem, with significant experience in <span className="font-semibold text-foreground">IPO</span>, <span className="font-semibold text-foreground">Mergers & Acquisitions</span>, and <span className="font-semibold text-foreground">Turnaround Advisory</span>.
          </p>
          <p data-testid="text-about-interests">
            Beyond spreadsheets and dashboards, I'm passionate about the intersection of finance and technology. I enjoy building <span className="font-semibold text-foreground">interactive websites</span> and exploring how digital tools can transform traditional financial analysis. When I'm not crunching numbers, you'll find me following <span className="font-semibold text-foreground">Formula 1</span> races with the same analytical intensity I bring to my work, or staying active through <span className="font-semibold text-foreground">badminton</span> and <span className="font-semibold text-foreground">table tennis</span>.
          </p>
          <p data-testid="text-about-philosophy">
            I thrive at the convergence of finance, technology, and strategy—where data-driven insights meet creative problem-solving to drive real business impact.
          </p>
        </div>

        {/* VERSION 2 - More Personal & Engaging 
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p data-testid="text-about-intro">
            I'm driven by curiosity and precision—whether I'm analyzing financial models, watching Lewis Hamilton navigate a Monaco corner, or perfecting my backhand in table tennis. As a <span className="font-semibold text-foreground">Chartered Accountant</span> and <span className="font-semibold text-foreground">data analyst</span>, I transform complex financial data into strategic insights that drive business decisions.
          </p>
          <p data-testid="text-about-interests">
            My passion for numbers extends beyond traditional finance. I love <span className="font-semibold text-foreground">designing and building websites</span>, creating tools that make financial data more accessible and engaging. This blend of analytical rigor and creative problem-solving defines my approach to every challenge.
          </p>
          <p data-testid="text-about-hobbies">
            Outside the office, I'm an avid <span className="font-semibold text-foreground">Formula 1</span> enthusiast who appreciates the sport's perfect marriage of data, strategy, and split-second decisions. I stay active through <span className="font-semibold text-foreground">badminton</span> and <span className="font-semibold text-foreground">table tennis</span>, where quick thinking and precision mirror the skills I bring to financial analysis.
          </p>
          <p data-testid="text-about-philosophy">
            At my core, I believe the future of finance lies in the intelligent fusion of traditional expertise with modern technology—and I'm excited to be part of that transformation.
          </p>
        </div>
        */}

        {/* VERSION 3 - Concise & Professional 
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p data-testid="text-about-intro">
            As a <span className="font-semibold text-foreground">Chartered Accountant</span> with deep expertise in <span className="font-semibold text-foreground">financial modeling</span> and <span className="font-semibold text-foreground">data analytics</span>, I specialize in translating complex financial information into actionable business strategies. My approach combines rigorous analytical methods with innovative thinking to deliver measurable results.
          </p>
          <p data-testid="text-about-tech">
            I'm particularly passionate about leveraging technology to enhance financial processes. I regularly <span className="font-semibold text-foreground">design and build web-based tools</span> that make data visualization and analysis more intuitive and impactful.
          </p>
          <p data-testid="text-about-balance">
            Outside of work, I maintain an active lifestyle through <span className="font-semibold text-foreground">badminton</span> and <span className="font-semibold text-foreground">table tennis</span>, and follow <span className="font-semibold text-foreground">Formula 1</span> racing—a sport that mirrors my appreciation for precision, strategy, and performance optimization.
          </p>
        </div>
        */}
      </div>
    </section>
  );
}
