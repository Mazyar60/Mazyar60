import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-effect">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold text-foreground">CoinMining</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Mine the future of gaming-powered crypto with our advanced staking platform.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#mining" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mining Plans
                </a>
              </li>
              <li>
                <a href="#rewards" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rewards
                </a>
              </li>
              <li>
                <a href="#referrals" className="text-muted-foreground hover:text-foreground transition-colors">
                  Referrals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our community and stay updated with the latest news.
            </p>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-primary text-sm">T</span>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <span className="text-primary text-sm">D</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CoinMining Game. All rights reserved. | Mine the Future of Gaming-Powered Crypto
          </p>
        </div>
      </div>
    </footer>
  )
}
