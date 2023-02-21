import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { IsNotEmpty, IsString, IsInt, IsNumber, IsOptional, validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  sifra: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  path: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  action: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  module: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  icon: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  usr: number;

  @Column({ default: 1 })
  @IsNotEmpty()
  @IsInt()
  validan: number;

  public validateMenu(jsonObject: any): Promise<void> {
    const menu = plainToClass(Menu, jsonObject);
    return validate(menu).then(errors => {
      if (errors.length > 0) {
        console.log("Nevalidan JSON objekat. Greške:");
        console.log(errors);
        throw new Error("Nevalidan JSON objekat.");
      } else {
        console.log("Validan JSON objekat.");
      }
    });
  }
}

/** 

  public validateMenu(jsonObject: any): Promise<void> {
    const menu = plainToClass(Menu, jsonObject);
    return validate(menu).then(errors => {
      if (errors.length > 0) {
        console.log("Nevalidan JSON objekat. Greške:");
        console.log(errors);
        throw new Error("Nevalidan JSON objekat.");
      } else {
        console.log("Validan JSON objekat.");
      }
    });
  }
  
#### Poziv Promise metode

##################################################
const { Menu } = require('./menu');

// korišćenje klase
const menu = new Menu();

menuService.validateMenu(jsonObject)
  .then(() => {
    // Do something if menu object is valid
  })
  .catch(error => {
    // Handle validation error
  });

##################################################
 ### poziv Asinc metode 
try {
  await validateMenu(jsonObject);
} catch (error) {
  console.log(error);
}
  
 */