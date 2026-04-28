import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Authentication from "@/app/_components/Authentication";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden shadow-lg rounded-2xl bg-gray-900 border-gray-800">
        <CardContent className="grid p-0 md:grid-cols-2 h-[500px]">
          {/* Left Side - Google Login */}
          <div className="relative flex flex-col items-center justify-center p-12 text-center gap-10 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
            {/* Elegant border accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 rounded-l-2xl"></div>
            <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-orange-500/60 to-transparent"></div>

            <div className="relative z-10 space-y-8">
              {/* Brand section */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">
                    AdGenAI
                  </span>
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>

                <h1 className="text-5xl font-thin text-white leading-tight">
                  Sign In
                </h1>
                <div className="w-16 h-px bg-gradient-to-r from-orange-500 to-purple-500 mx-auto"></div>
                <p className="text-gray-400 font-light text-lg max-w-xs mx-auto leading-relaxed">
                  Access your creative workspace and start building amazing
                  campaigns
                </p>
              </div>
            </div>

            <div className="relative z-10 w-full max-w-sm space-y-6">
              <Authentication>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-4 border-2 border-gray-700/80 bg-gray-800/60 hover:bg-gray-700/80 hover:border-orange-500/50 text-white py-5 px-8 rounded-xl font-medium text-base transition-all duration-300 backdrop-blur-sm shadow-xl hover:shadow-orange-500/10"
                >
                  <div className="flex items-center justify-center w-6 h-6 bg-white rounded-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="#4285F4"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Continue with Google</span>
                </Button>
              </Authentication>

              <div className="flex items-center justify-center gap-4 text-gray-500 text-xs">
                <span>Secure</span>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <span>Private</span>
                <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                <span>Fast</span>
              </div>
            </div>
          </div>

          {/* Right Side - Dashboard Demo Video */}
          <div className="relative hidden md:block bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/login-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Beautiful center overlay text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
              {/* Gradient overlay for better readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30"></div>

              <div className="relative text-center px-8">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-orange-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Welcome back
                </h2>

                <p className="text-xl md:text-2xl font-semibold text-orange-200 drop-shadow-xl mb-4">
                  Create your first stunning ad
                </p>

                {/* Decorative underline */}
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
              @keyframes fade-in {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              @keyframes slide-up {
                from {
                  transform: translateY(20px);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              @keyframes slide-up-delay {
                from {
                  transform: translateY(20px);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              @keyframes expand {
                from {
                  width: 0;
                }
                to {
                  width: 6rem;
                }
              }
              .animate-fade-in {
                animation: fade-in 1s ease-out;
              }
              .animate-slide-up {
                animation: slide-up 0.8s ease-out 0.2s both;
              }
              .animate-slide-up-delay {
                animation: slide-up-delay 0.8s ease-out 0.4s both;
              }
              .animate-expand {
                animation: expand 1s ease-out 0.8s both;
              }
            `}</style>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-400 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-orange-500">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
