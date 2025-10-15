import { Link } from 'wouter';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@shared/blogData';
import Navigation from '@/components/Navigation';
import ContactSection from '@/components/ContactSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Blog() {
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-accent font-bold text-5xl md:text-6xl lg:text-7xl mb-6" data-testid="text-blog-title">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blog-description">
            Insights on finance, transaction advisory, and career development from my experience in the field
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 md:px-12 border-b border-border">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          <Badge variant="outline" className="text-sm" data-testid="badge-category-all">
            All Posts
          </Badge>
          {categories.map(category => (
            <Badge key={category} variant="secondary" className="text-sm" data-testid={`badge-category-${category.toLowerCase()}`}>
              {category}
            </Badge>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover-elevate transition-all duration-300 overflow-hidden" data-testid={`card-blog-${post.slug}`}>
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      data-testid={`img-post-thumbnail-${post.slug}`}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" data-testid={`badge-post-category-${post.slug}`}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1" data-testid={`text-post-date-${post.slug}`}>
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1" data-testid={`text-post-readtime-${post.slug}`}>
                          <Clock className="w-4 h-4" />
                          {post.readTime} min
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2" data-testid={`text-post-title-${post.slug}`}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-base" data-testid={`text-post-excerpt-${post.slug}`}>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
