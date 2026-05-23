import { Search } from "lucide-react";

import Button from "@/components/shared/button";
import InputRow from "@/components/shared/input-row";
import Card from "../shared/card";

export default function SearchCard() {
  return (
    <section className="px-4">
      <Card className="p-4">
        <div className="space-y-3">
          <InputRow label="Location" value="Any Location" />

          <InputRow label="Property Type" value="Villa, Apartment, Plot..." />

          <InputRow label="Budget" value="Min Price - Max Price" />
        </div>

        <div className="mt-4">
          <Button>
            <div className="flex items-center gap-2">
              <Search size={18} />

              <span>Search Properties</span>
            </div>
          </Button>
        </div>
      </Card>
    </section>
  );
}
