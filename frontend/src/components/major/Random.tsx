import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Random() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <span className="text-3xl font-bold">Match with a </span>
        <span className="text-3xl font-bold text-primary">random</span>
        <span className="text-3xl font-bold"> Haribon!</span>
      </div>

      <div className="flex flex-row mt-6 items-center space-x-2">
        <Checkbox id="prefcourse" />
        <label htmlFor="prefcourse">Prefer same course</label>
      </div>

      <Button
        className="mt-3 bg-primary text-primary-foreground"
        variant="outline"
      >
        Let's go!
      </Button>
    </div>
  );
}
