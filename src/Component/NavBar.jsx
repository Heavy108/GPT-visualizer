"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [frameworks, setFrameworks] = React.useState([]);
  const [error, setError] = React.useState(null);
  
// console.log(process.env.SERVER_ENDPOINT)
  React.useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://192.168.87.88:4000/models", {
          method: 'GET',
          // mode: 'no-cors', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

       console.log(response)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const formattedModels = data.models.map(model => ({
          value: model,
          label: model.charAt(0).toUpperCase() + model.slice(1)
        }));
        setFrameworks(formattedModels);
        setError(null);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('Failed to load languages. Please try again later.');
        // setFrameworks([
        //   { value: "asm", label: "Assamese" }
        // ]);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="relative">
      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select Language..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No Language found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      console.log(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}