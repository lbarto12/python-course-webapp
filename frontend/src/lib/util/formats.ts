export function description_format(desc: string): string {
    return desc.replaceAll(
        /(".*?")/g,
        '<span style="color: rgb(214, 157, 133);">$1</span>'
    ).replaceAll(
        /('.*?')/g,
        '<span style="color: rgb(214, 157, 133);">$1</span>'
    ).replaceAll(
        /<code>((.|\n)*?)<\/code>/g,
        '<div style="padding: 5px; border-radius: 4px; background-color: #282c34;"><code style="white-space: pre-wrap;">$1</code></div>'
    ).replaceAll(
        /`(.*?)`/g,
        '<span style="background-color: grey; padding: 3px; border-radius: 2px;">$1</span>'
    ).replaceAll(
        /<cmt>(.*?)<\/cmt>/g,
        "<span style='color: hsl(120, 77%, 27%);'>$1</span>"
    ).replaceAll(
        /<fun>(.*?)<\/fun>/g,
        "<span style='color: #ead84e;'>$1</span>"
    ).replaceAll(
        /<var>(.*?)<\/var>/g, 
        "<span style='color: rgb(132, 157, 204);'>$1</span>"
    ).replaceAll(
        /<class>(.*?)<\/class>/g,
        "<span style='color: #aef359;'>$1</span>"
    ).replaceAll(
        /<kwd>(.*?)<\/kwd>/g,
        "<span style='color: #c586c0;'>$1</span>"
    )
}