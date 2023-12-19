import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { SearchIcon } from 'lucide-react'
import { Input } from '../ui/input'

interface Props {
    showText?: boolean
}

const Search = ({ showText }: Props) => {
    return (
        <Sheet>
            <SheetTrigger className="flex items-end gap-x-2">
                <SearchIcon className="h-8 w-8 text-secondary-foreground" />
                {showText && <span className={`text-secondary-foreground origin-left duration-300`}>Search</span>}
            </SheetTrigger>
            <SheetContent side={'left'} className="bg-tansparent w-80">
                <SheetHeader>
                    <SheetTitle>Search</SheetTitle>
                    <SheetDescription>Search for posts, users, tags, and more.</SheetDescription>
                </SheetHeader>
                <div className="flex justify-center mt-8">
                    <Input placeholder="Search" className="w-full" />
                </div>
                <div className="mt-8 border-t py-6">
                    <h4 className="font-bold">Recent searches</h4>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <h4 className="font-bold">No content</h4>
                </div>
                {/* <SheetFooter>
                    <button className="btn btn-primary">Delete</button>
                    <button className="btn btn-secondary">Cancel</button>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}

export { Search }
