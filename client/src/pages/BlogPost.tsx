import { useRoute, Link } from 'wouter';
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter } from 'lucide-react';
import { blogPosts } from '@shared/blogData';
import Navigation from '@/components/Navigation';
import ContactSection from '@/components/ContactSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NotFound from '@/pages/not-found';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const post = blogPosts.find(p => p.slug === params?.slug);

  if (!post) {
    return <NotFound />;
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out: ${post.title}`;

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Back Button */}
      <section className="pt-24 pb-8 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2" data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article className="pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" data-testid="badge-post-category">
              {post.category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1" data-testid="text-post-date">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-1" data-testid="text-post-readtime">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
            </div>
          </div>

          <h1 className="font-accent font-bold text-4xl md:text-5xl lg:text-6xl mb-6" data-testid="text-post-title">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-post-excerpt">
            {post.excerpt}
          </p>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
            <span className="text-sm text-muted-foreground">Share:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnLinkedIn}
              className="gap-2"
              data-testid="button-share-linkedin"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnTwitter}
              className="gap-2"
              data-testid="button-share-twitter"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-accent prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-6 prose-li:my-2
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
            data-testid="article-content"
            dangerouslySetInnerHTML={{ __html: post.content.split('\n').map(line => {
              if (line.startsWith('# ')) {
                return `<h1>${line.substring(2)}</h1>`;
              } else if (line.startsWith('## ')) {
                return `<h2>${line.substring(3)}</h2>`;
              } else if (line.startsWith('### ')) {
                return `<h3>${line.substring(4)}</h3>`;
              } else if (line.startsWith('- ')) {
                return `<li>${line.substring(2)}</li>`;
              } else if (line.trim() === '') {
                return '<br />';
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return `<p><strong>${line.substring(2, line.length - 2)}</strong></p>`;
              } else {
                return `<p>${line}</p>`;
              }
            }).join('') }}
          />

          {/* Author Card */}
          <Card className="mt-12 p-6" data-testid="card-author">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-accent font-bold text-2xl text-primary">SB</span>
              </div>
              <div>
                <p className="font-semibold text-lg" data-testid="text-author-name">
                  {post.author}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-author-bio">
                  Finance Professional | Chartered Accountant | CFA Level 2 Candidate
                </p>
              </div>
            </div>
          </Card>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="font-accent font-bold text-3xl mb-8" data-testid="text-related-posts">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover-elevate transition-all" data-testid={`card-related-${relatedPost.slug}`}>
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold text-xl mb-2" data-testid={`text-related-title-${relatedPost.slug}`}>
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-related-excerpt-${relatedPost.slug}`}>
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
