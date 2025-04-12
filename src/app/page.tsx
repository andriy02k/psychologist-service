import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <main className="">
      qwe
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectSeparator />
          <SelectItem value="banana">Banana</SelectItem>
          <SelectSeparator />
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectSeparator />
          <SelectItem value="grape">Grape</SelectItem>
          <SelectSeparator />
          <SelectItem value="kiwi">Kiwi</SelectItem>
          <SelectSeparator />
          <SelectItem value="mango">Mango</SelectItem>
          <SelectSeparator />
        </SelectContent>
      </Select>
    </main>
  );
}
