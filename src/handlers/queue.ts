import { Composer } from 'telegraf';
import { queue } from '../tgcalls';
import { escape } from 'html-escaper';

export const QueueList = Composer.command(`queue`, async (ctx) => {
    if (queue.hasNoData(ctx.chat.id)) return await ctx.replyWithHTML("Nothing in this chat");

    let data = queue.getAll(ctx.chat.id);
    if (data.length === 0) return await ctx.replyWithHTML("Queue is empty");

    let text = `<b><u>Queue List : </u></b>\n\n`;
    data.forEach((d, i) => {
        text += `<b>${i + 1} :</b> <a href="${d.link}">${escape(d.title)}</a>\nRequested by : <a href="tg://user?id=${d.requestedBy.id}">${escape(d.requestedBy.first_name)}</a>\n\n`
    })
    return await ctx.replyWithHTML(text, { disable_web_page_preview: true })
})