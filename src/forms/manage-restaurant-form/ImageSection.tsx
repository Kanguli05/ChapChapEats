import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";


export default function ImageSection() {

    const { control, watch } = useFormContext();

    const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Image</h2>
            <FormDescription>
                Add an Image that will be displayed on the restaurant listing in the search results. <br />
                Adding a new Image will replace the existing one.
            </FormDescription>
        </div>

        <div className="flex flex-col gap-8 md:w-[50%]">
            {existingImageUrl &&
            <AspectRatio ratio={16 / 9}>
                <img src={existingImageUrl} className="rounded-md object-cover h-full w-full" alt="existing image" />
            </AspectRatio>}
            <FormField control={control} name="imageFile" render={({ field }) => (
                <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white"type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange = {(event) => field.onChange(event.target.files ? event.target.files[0] : null)}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
    </div>
  )
}
