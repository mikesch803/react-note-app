export type NoteProps = {
    note : {
        _id:string;
        title: string;
        desc: string;
        priority: string;
        tags: string;
        cardColor: string;
        date: number;
    };
    setEditNoteBtn :  React.Dispatch<React.SetStateAction<boolean>> ; 
}