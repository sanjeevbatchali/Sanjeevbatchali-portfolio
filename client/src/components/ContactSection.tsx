import { MapPin, Mail, Linkedin, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-12 md:py-16 px-6 md:px-12 bg-muted/30 border-t border-border" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent font-bold text-3xl md:text-4xl mb-8 text-center" data-testid="text-section-title">
          Contact Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover-elevate" data-testid="contact-location">
            <div className="p-3 bg-primary/10 rounded-full">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-medium" data-testid="text-location">Hyderabad</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover-elevate" data-testid="contact-email">
            <div className="p-3 bg-primary/10 rounded-full">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a 
                href="mailto:ca.sanjeevbatchali@gmail.com" 
                className="font-medium hover:text-primary transition-colors"
                data-testid="link-email"
              >
                ca.sanjeevbatchali@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover-elevate" data-testid="contact-linkedin">
            <div className="p-3 bg-primary/10 rounded-full">
              <Linkedin className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
              <a 
                href="https://www.linkedin.com/in/sanjeevbatchali/" 
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
                data-testid="link-linkedin"
              >
                Sanjeev Batchali
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 rounded-lg hover-elevate" data-testid="contact-phone">
            <div className="p-3 bg-primary/10 rounded-full">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <p className="font-medium" data-testid="text-phone">Available on request</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 Sanjeev Batchali. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
