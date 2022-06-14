import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity("rents")
class Rent {
    
    @PrimaryColumn()
    id: string;

    @Column()
    id_user: string;

    @Column()
    id_book: string;
    
    @Column()
    returned: boolean;

    @Column()
    returned_at: Date;
   
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }

}

export { Rent }