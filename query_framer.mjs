import { connect, framer } from "framer-api";

async function main() {
  try {
    console.log("Connecting with framer-api connect(url, apiKey)...");
    await connect("https://framer.com/projects/Creatie-copy--ccFal9m6QDBsdk0YVJM9-hJgnC", "fr_5sn3f0tt5a91wr5z7j40r6ec6y");

    console.log("🎉 Successfully connected to live Framer project!");
    const projectInfo = await framer.getProjectInfo();
    console.log("Project Info:", projectInfo);

    const pages = await framer.getPages();
    console.log("Pages:", pages.map(p => ({ id: p.id, name: p.name, path: p.path })));

    const components = await framer.getComponents();
    console.log("Components count:", components.length);
    console.log("Component names:", components.map(c => c.name));

    const codeFiles = await framer.getCodeFiles();
    console.log("Code files:", codeFiles.map(f => f.name));

  } catch (err) {
    console.error("Framer SDK error:", err);
  }
}

main();
