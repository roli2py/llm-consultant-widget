function escapeHtml(source: string): string {
    return source
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};


export default function escapeHtmlExceptCode(html: string): string {
    const codeRegex = /(`{1,3})(.*?)\1/g;

    const codeSnippets: { content: string, backtickCount: number }[] = [];
    let modifiedHtml = html;

    modifiedHtml = modifiedHtml.replace(codeRegex, (_, backticks, codeContent) => {
        const backtickCount = backticks.length;
        codeSnippets.push({ content: codeContent, backtickCount });
        return `###CODE_BLOCK_${codeSnippets.length - 1}###`;
    });

    modifiedHtml = escapeHtml(modifiedHtml);

    codeSnippets.forEach((snippet, index) => {
        const codePlaceholder = `###CODE_BLOCK_${index}###`;
        const wrappedCode = `${"`".repeat(snippet.backtickCount)}${snippet.content}${"`".repeat(snippet.backtickCount)}`;
        modifiedHtml = modifiedHtml.replace(codePlaceholder, wrappedCode);
    });

    return modifiedHtml;
};
