export class Types {

    public id?: number;
    public libType?: string;
    public descriptionType?: string;


    constructor(id: number, libType: string, descriptionType: string) {
        this.id = id;
        this.libType = libType;
        this.descriptionType = descriptionType;

    }
}