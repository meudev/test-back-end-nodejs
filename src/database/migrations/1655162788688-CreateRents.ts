import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRents1655162788688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rents",
                columns: [
                    {
                        name: "id",
                        type: "uuid"
                    },
                    {
                        name: "id_user",
                        type: "uuid"
                    },
                    {
                        name: "id_book",
                        type: "uuid"
                    },
                    {
                        name: "returned",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "returned_at",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rents");
    }

}
