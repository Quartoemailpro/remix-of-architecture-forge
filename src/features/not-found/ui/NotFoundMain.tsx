import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundMain() {
  return (
    <div className="container py-32 text-center">
      <h1 className="text-8xl font-mono font-bold text-primary/20 mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found.</p>
      <Button asChild variant="outline" className="gap-2">
        <Link to="/">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
