import { Github, Code, Globe, Zap } from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const action = (
      (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
    ).value as "mcp" | "chat" | null;

    // Basic URL validation
    let processedUrl = url.trim();
    if (!processedUrl) {
      setError("Please use a valid GitHub URL");
      return;
    }

    // Add https:// if not present
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = `https://${processedUrl}`;
    }

    let targetUrl: string | null = null;

    try {
      const urlObj = new URL(processedUrl);
      const hostname = urlObj.hostname;
      const pathname = urlObj.pathname.replace(/^\/+|\/+$/g, "");

      // Case 1: GitHub repository URL (github.com/owner/repo)
      if (hostname === "github.com") {
        const parts = pathname.split("/");
        if (parts.length >= 2) {
          const owner = parts[0];
          const repo = parts[1];
          if (owner && repo) {
            targetUrl = `https://gitmcp.9mirrors.xyz/${owner}/${repo}${action === "chat" ? "/chat" : ""}`;
          }
        }
      }
      // Case 2: GitHub Pages URL (owner.github.io/repo)
      else if (hostname.endsWith(".github.io")) {
        const owner = hostname.replace(".github.io", "");
        if (owner && pathname) {
          const repo = pathname.split("/")[0];
          if (repo) {
            targetUrl = `https://gitmcp.9mirrors.xyz/${owner}/${repo}${action === "chat" ? "/chat" : ""}`;
          }
        }
      }

      if (!targetUrl) {
        setError(
          "Invalid GitHub URL format. Please use github.com/owner/repo or owner.github.io/repo",
        );
        return;
      }

      // Open the GitMCP URL in a new tab
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError("Please enter a valid URL");
    }
  };

  const handleTryExample = () => {
    setUrl("github.com/langchain-ai/langgraph");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* GitHub Link */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <a
          href="https://github.com/idosal/git-mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-md transition-colors duration-200 border border-gray-700 z-10"
        >
          <Github className="h-5 w-5" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-8 bg-gray-900 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <div className="mt-0 max-w-3xl mx-auto sm:mt-6">
              <Divider text="or try the instant GitHub URL converter below" />
            </div>
          </div>

          {/* GitHub URL Input Form */}
          <div className="max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="github-url"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Enter any GitHub repository URL:
                </label>
                <div className="relative">
                  <input
                    id="github-url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Example: github.com/langchain-ai/langgraph"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={handleTryExample}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 px-2 py-1 rounded transition-colors duration-200"
                  >
                    Try Example
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  value="mcp"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-emerald-900/25"
                >
                  To MCP
                </button>
                <button
                  type="submit"
                  value="chat"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-900/25"
                >
                  To Chat
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Instantly create a Remote MCP server for any GitHub repository
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Simply change the domain from github.com or github.io to
                gitmcp.io and get instant AI context for any GitHub repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl sm:text-2xl font-bold mb-2">
                <span className="text-blue-400">Git</span>
                <span className="text-emerald-400">MCP</span>
              </div>
              <p className="text-sm sm:text-base text-gray-500">
                © 2025 GitMCP. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Example({
  from,
  to,
  bold,
}: {
  from: string;
  to: string;
  bold: string | string[];
}) {
  const withBold = (text: string) => {
    let result = text;
    const boldArray = Array.isArray(bold) ? bold : [bold];
    boldArray.forEach((b) => {
      result = result.replace(b, `<b>${b}</b>`);
    });
    return result;
  };
  return (
    <div className="flex flex-col sm:flex-row items-center pb-3 pt-2">
      <div className="flex-1 flex items-center justify-center sm:justify-end text-gray-300 text-sm sm:text-lg font-mono px-2 sm:px-4 mb-2 sm:mb-0">
        <span dangerouslySetInnerHTML={{ __html: withBold(from) }} />
      </div>
      <div className="mx-2 sm:mx-4 text-gray-500 transform rotate-90 sm:rotate-0">
        →
      </div>
      <div className="flex-1 flex items-center justify-center sm:justify-start text-emerald-400 text-sm sm:text-lg font-mono px-2 sm:px-4">
        <span dangerouslySetInnerHTML={{ __html: withBold(to) }} />
      </div>
    </div>
  );
}

function Divider({ text, simple }: { text?: string; simple?: boolean }) {
  if (simple) {
    return (
      <div className="flex justify-center py-1">
        <div className="w-48 h-px bg-gray-700/70"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full my-4">
      <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-gray-700"></div>
      {text && (
        <div className="px-4 py-1 bg-gray-800 text-gray-400 text-sm rounded-full border border-gray-700">
          {text}
        </div>
      )}
      <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-gray-700"></div>
    </div>
  );
}

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      text: "Remote documentation server",
      icon: (
        <Globe className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-400" />
      ),
    },
    {
      text: "Connect your IDE to the world",
      icon: (
        <Code className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-400" />
      ),
    },
    {
      text: "Prevent AI code hallucinations",
      icon: (
        <Zap className="mr-2 sm:mr-3 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-emerald-400" />
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const getSlideClass = (index: number) => {
    // Current slide
    if (index === currentSlide) {
      return "opacity-100 z-10";
    }

    // All other slides - simple opacity change for cross-fade
    return "opacity-0 z-0";
  };

  return (
    <div className="relative my-4 mt-0 h-[70px] sm:h-[80px] md:h-[100px] mx-auto max-w-4xl">
      <div className="overflow-hidden h-full relative ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-2000 ease-in-out ${getSlideClass(index)}`}
          >
            <div className="flex items-center justify-center">
              {/* <div
                className={`transition-all duration-2000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {slide.icon}
              </div> */}
              <h3 className="text-2xl sm:text-3xl md:text-[48px] font-bold tracking-tight bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 text-gradient animate-gradient-x px-4 text-center">
                {slide.text}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
