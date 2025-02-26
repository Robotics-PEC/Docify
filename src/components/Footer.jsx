import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 ">
            <h3 className="text-lg font-semibold">Docify</h3>
            <p className="text-sm text-muted-foreground">
              Create documents with ease using our intuitive platform.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Docify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
