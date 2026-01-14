import { useState, useEffect } from 'react';
import { History, Trash2, X, Download, FileText } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getExportHistory, clearExportHistory, ExportHistory } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export function ExportHistoryModal() {
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState<ExportHistory[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (open) {
            setHistory(getExportHistory());
        }
    }, [open]);

    const handleClear = () => {
        clearExportHistory();
        setHistory([]);
        toast({
            title: 'History cleared',
            description: 'All export history has been removed.',
        });
    };

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        toast({
            title: 'Copied!',
            description: 'Export content copied to clipboard.',
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" title="Export History">
                    <History className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Export History</DialogTitle>
                    <DialogDescription>
                        View your recent export activities.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                        {history.length} record{history.length !== 1 ? 's' : ''} found
                    </span>
                    {history.length > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleClear}
                            className="h-8 text-xs"
                        >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Clear All
                        </Button>
                    )}
                </div>

                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-2">
                            <History className="h-8 w-8 opacity-20" />
                            <p>No export history found.</p>
                            <p className="text-xs">Use the tools to generate and export content.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item) => (
                                <div key={item.id} className="flex flex-col gap-2 p-3 rounded-lg border bg-secondary/20">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-md bg-secondary">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium capitalize">{item.toolKey} Export</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => handleCopy(item.data)}
                                            title="Copy content"
                                        >
                                            <Download className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="text-xs font-mono bg-background/50 p-2 rounded border truncate">
                                        {item.format}: {item.data.substring(0, 50)}...
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
