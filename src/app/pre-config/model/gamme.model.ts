export class Gamme {

    public id?: number;
    public libGamme?: string;
    public descriptionGamme?: string;


    constructor(id: number, libGamme: string, descriptionGamme: string) {
        this.id = id;
        this.libGamme = libGamme;
        this.descriptionGamme = descriptionGamme;

    }
}