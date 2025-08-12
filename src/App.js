// Lucide React Icons (imported as components)
const Download = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const FileText = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14,2 L20,8 L20,20 a2,2 0 0,1 -2,2 L6,22 a2,2 0 0,1 -2,-2 L4,4 a2,2 0 0,1 2,-2 L14,2 Z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const Check = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const Play = ({ className, ...props }) => (
  <svg className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('homepage');

  const pricingTiers = [
    {
      name: 'Better',
      price: 0,
      period: 'Free',
      features: [
        'Basic Resume Builder',
        'Modern templates',
        'Direct Q&A format',
        'PDF download',
        'ATS-friendly formatting'
      ],
      popular: false
    },
    {
      name: 'Best',
      price: 19,
      period: '/month',
      features: [
        'Everything in Better',
        'AI-powered bullet point suggestions',
        'Achievement prompts',
        'Upload one job description for keyword analysis',
        'Unlimited drafts',
        'Priority email support'
      ],
      popular: true
    },
    {
      name: 'Immaculate',
      price: 49,
      period: '/month',
      features: [
        'Everything in Best',
        'Side-by-side Dyslexia-friendly proofreading tool',
        'AI-generated career summaries',
        'AI-driven narrative building',
        'Upload multiple attachments',
        'Priority support with 24/7 chat'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl text-gray-900">LAUNCHPADPOINT</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                The Launchpad for Your Career.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Craft a professional, ATS-friendly resume with our AI-powered tool. 
                Choose the plan that fits your career goals.
              </p>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all shadow-lg">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Find the Plan That's Right for You.
            </h2>
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
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{tier.name}</h3>
                  <div className="text-6xl font-bold text-gray-900 mb-2">
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
                
                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  tier.popular 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg transform hover:scale-105' 
                    : 'border-2 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600'
                }`}>
                  {tier.price === 0 ? 'Start Free' : `Get Started - $${tier.price}/mo`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="font-bold">LAUNCHPADPOINT</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">Stand Out. Get Hired. Move Up.</p>
            <p className="text-gray-500 text-sm">© 2025 LaunchpadPoint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
