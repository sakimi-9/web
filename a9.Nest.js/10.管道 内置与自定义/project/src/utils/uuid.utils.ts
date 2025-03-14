import { v4 as uuidv4 } from 'uuid';

export function generateUUID(): string {
    console.log(uuidv4());

    return uuidv4();
}