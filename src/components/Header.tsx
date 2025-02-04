import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-primary py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Financial Aid Portal</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-white hover:text-accent transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-accent transition-colors">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-accent transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};