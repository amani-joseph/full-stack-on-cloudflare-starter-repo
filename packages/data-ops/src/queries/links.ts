import { getDb } from "@/db/database";
import { links } from "@/drizzle-out/schema";
import { nanoid } from "nanoid";
import type { CreateLinkSchemaType } from "@/zod/links";
export async function createLink(data: CreateLinkSchemaType & {accountId: string}) {
    const db = getDb();
    const id = nanoid(10);
    try {
        await db.insert(links).values({
            linkId: id,
            accountId: data.accountId,
            name: data.name,
            destinations: JSON.stringify(data.destinations),
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`createLink failed: ${message}`);
    }
    return id;
}