import ReactSvg from '../assets/react.svg';
import GithubMarkSvg from '../assets/github-mark.svg';
import GithubMarkWhiteSvg from '../assets/github-mark-white.svg';

/**
 * Renders the application footer.
 * @returns {JSX.Element} The rendered footer component.
 */
export default function AppFooter() {
  return (
    <footer className="text-center py-4 border-top-default bg-card text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center flex-wrap gap-4 px-4">
        <div className="flex items-center gap-3">
          <img
            src={ReactSvg}
            alt="React Logo"
            width={24}
            height={24}
            className="drop-shadow-sm react-logo-light"
          />
          <img
            src={ReactSvg}
            alt="React Logo"
            width={24}
            height={24}
            className="drop-shadow-sm react-logo-dark hidden"
          />
          <div className="text-sm text-foreground">
            &copy; 2025 Modus 2.0 React App - Built with React + Vite
          </div>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/julianoczkowski/modus-react-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm flex items-center transition-colors duration-200 no-underline text-foreground hover:opacity-80"
          >
            <img
              src={GithubMarkSvg}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-1.5 github-icon-light"
            />
            <img
              src={GithubMarkWhiteSvg}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-1.5 github-icon-dark"
            />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
