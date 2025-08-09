@@ .. @@
 import { Button } from "@/components/ui/button"
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
-import { User } from "../data/schema"
-import { UsersActionDialog } from "./users-action-dialog"
-import { UsersDeactivateDialog } from "./users-deactivate-dialog"
+import { Loan } from "../data/schema"
+import { PipelineActionDialog } from "./pipeline-action-dialog"
+import { PipelineDeactivateDialog } from "./pipeline-deactivate-dialog"
 
 interface Props {
-  row: Row<User>
+  row: Row<Loan>
 }
 
 export function DataTableRowActions({ row }: Props) {
@@ .. @@
         <DropdownMenuContent align="end" className="w-[160px]">
           <DropdownMenuItem asChild>
-            <Link href={`/users/${row.original.id}`}>
+            <Link href={`/pipeline/${row.original.id}`}>
               View Detail
               <DropdownMenuShortcut>
                 <IconChecklist size={16} />
@@ .. @@
           <DropdownMenuItem
             onClick={() => setOpen("deactivate")}
-            className="text-red-500!"
+            className="text-red-500"
           >
-            Deactivate
+            Remove
             <DropdownMenuShortcut>
               <IconTrash size={16} />
             </DropdownMenuShortcut>
@@ .. @@
         </DropdownMenuContent>
       </DropdownMenu>
 
-      <UsersActionDialog
-        key={`user-edit-${row.original.id}`}
+      <PipelineActionDialog
+        key={`loan-edit-${row.original.id}`}
         open={open === "edit"}
         onOpenChange={() => setOpen("edit")}
         currentRow={row.original}
       />
 
-      <UsersDeactivateDialog
-        key={`user-deactivate-${row.original.id}`}
+      <PipelineDeactivateDialog
+        key={`loan-deactivate-${row.original.id}`}
         open={open === "deactivate"}
         onOpenChange={() => setOpen("deactivate")}
         currentRow={row.original}
       />