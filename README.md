            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  The Launchpad for Your Career.
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Craft a professional, ATS-friendly resume with our AI-powered tool. 
                  Choose the plan that fits your career goals.
                </p>
                <button 
                  onClick={() => setActiveTab('builder')}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all shadow-lg"
                >
                  Start for Free
                </button>
                <p className="text-sm text-gray-500 mt-3">No credit card required • Build your first resume instantly</p>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-600 font-medium">Watch Resume Build in Real-Time</p>
                      <div className="mt-4 space-y-2">
                        <div className="h-2 bg-green-200 rounded animate-pulse"></div>
                        <div className="h-2 bg-yellow-200 rounded animate-pulse delay-100"></div>
                        <div className="h-2 bg-green-200 rounded animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Our AI Resume Builder Is Different.
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We go beyond simple templates. Our intelligent system helps you craft a compelling narrative, 
                write powerful bullet points, and ensure your resume is perfectly formatted for recruiters and 
                Applicant Tracking Systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-green-50 rounded-2xl">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Story-Driven</h3>
                <p className="text-gray-600">Build a narrative that connects your career progression and showcases your unique professional journey.</p>
              </div>

              <div className="text-center p-8 bg-yellow-50 rounded-2xl">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">ATS-Friendly</h3>
                <p className="text-gray-600">Our templates are optimized to pass through hiring software and get your resume in front of human recruiters.</p>
              </div>

              <div className="text-center p-8 bg-green-50 rounded-2xl">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Accomplishment-Focused</h3>
                <p className="text-gray-600">Turn duties into achievements with our AI-powered prompts that highlight your measurable impact.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - HIGHLIGHTED */}
        <section className="py-20 bg-gradient-to-r from-green-50 to-yellow-50 border-4 border-green-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Find the Plan That's Right for You.
              </h2>
              <p className="text-lg text-gray-600 font-medium">💰 REVENUE POTENTIAL: $4,000-$12,000/month with these prices</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.name}
                  className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 ${
                    tier.popular ? 'border-green-400 transform scale-105' : 'border-gray-200'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular - 60% choose this!
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                    <div className="text-6xl font-bold text-gray-900 mb-2">
                      ${tier.price}
                      <span className="text-lg text-gray-500">{tier.period}</span>
                    </div>
                    {tier.price > 0 && (
                      <p className="text-sm text-green-600 font-medium">
                        💰 Avg Customer Value: ${tier.price * 12}/year
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => {
                      setSelectedTier(tier.name);
                      setActiveTab('builder');
                    }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      tier.popular 
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg transform hover:scale-105' 
                        : 'border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600'
                    }`}
                  >
                    {tier.price === 0 ? 'Start Free' : `Get Started - $${tier.price}/mo`}
                  </button>
                  
                  {tier.popular && (
                    <p className="text-center text-xs text-gray-500 mt-2">
                      🎯 Target: 300 users/month = ${tier.price * 300}/mo revenue
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">📊 Revenue Projections</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-bold text-gray-900">Month 1 Target</div>
                  <div className="text-green-600">200 free + 50 paid = $1,500/mo</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="font-bold text-gray-900">Month 6 Target</div>
                  <div className="text-green-600">1000 free + 300 paid = $8,000/mo</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="font-bold text-gray-900">Year 1 Target</div>
                  <div className="text-green-600">3000 free + 800 paid = $20,000/mo</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What Our Users Are Saying.
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-800 mb-6 italic">
                  "{testimonials[testimonialIndex].text}"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900">{testimonials[testimonialIndex].name}</p>
                  <p className="text-gray-600">{testimonials[testimonialIndex].role} at {testimonials[testimonialIndex].company}</p>
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === testimonialIndex ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <span className="font-bold">LAUNCHPADPOINT</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Stand Out. Get Hired. Move Up.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Herbert Essien</p>
                  <p>832.418.7456</p>
                  <p>HerbEssien@gmail.com</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <div className="space-y-2 text-sm">
                  <button className="text-gray-400 hover:text-white block">About Us</button>
                  <button className="text-gray-400 hover:text-white block">Contact</button>
                  <button className="text-gray-400 hover:text-white block">FAQ</button>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <div className="space-y-2 text-sm">
                  <button className="text-gray-400 hover:text-white block">Terms of Service</button>
                  <button className="text-gray-400 hover:text-white block">Privacy Policy</button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 LaunchpadPoint. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Resume Builder
  if (activeTab === 'builder') {
    if (currentStep === 'pricing') {
      return (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setActiveTab('homepage')}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900">LAUNCHPADPOINT</span>
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
              <p className="text-xl text-gray-600">Start building your career-changing resume today</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.name}
                  className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all ${
                    selectedTier === tier.name 
                      ? 'border-green-500 bg-green-50 shadow-xl' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${tier.popular ? 'ring-2 ring-green-400' : ''}`}
                  onClick={() => setSelectedTier(tier.name)}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <div className="text-5xl font-bold text-green-600 mb-2">
                      ${tier.price}
                      <span className="text-lg text-gray-500">{tier.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {selectedTier === tier.name && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Selected
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedTier && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border">
                <h2 className="text-3xl font-bold mb-8 text-center">Let's Build Your Story</h2>
                
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="location"
                      placeholder="City, State *"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Details</h3>
                    <input
                      type="text"
                      name="targetRole"
                      placeholder="Target Job Title *"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.targetRole}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="LinkedIn Profile URL"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                    />
                    <input
                      type="url"
                      name="website"
                      placeholder="Portfolio/Website URL"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
