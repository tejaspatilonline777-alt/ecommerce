import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page" style={{ padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Get in Touch</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)' }}>
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                    <Card>
                        <h3 style={{ marginBottom: '1.5rem' }}>Send us a message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Message</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Your message..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={5}
                                />
                            </div>
                            <Button type="submit" variant="primary" size="lg" fullWidth>
                                <Send size={20} />
                                Send Message
                            </Button>
                        </form>
                    </Card>

                    <div>
                        <Card style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Mail size={24} color="white" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Email Us</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>support@aarambh.com</p>
                                </div>
                            </div>
                        </Card>

                        <Card style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Phone size={24} color="white" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Call Us</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>+91 98765 43210</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <MapPin size={24} color="white" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.5rem' }}>Visit Us</h4>
                                    <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                                        123 Fashion Street<br />
                                        Mumbai, Maharashtra 400001<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .contact-page [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Contact;
