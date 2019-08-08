export class Droit {

    public id?: number;
    public libDroit?: string;
    public codeDroit?: string;
    public descriptionDroit?: string;

    constructor(id: number, libDroit: string, codeDroit: string, descriptionDroit: string) {
        this.id = id ;
        this.libDroit = libDroit ;
        this.codeDroit = codeDroit;
        this.descriptionDroit = descriptionDroit;

    }
}