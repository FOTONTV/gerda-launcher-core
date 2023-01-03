# Launcher Core Module

Provide the core function to parse Minecraft version and launch.

## Использование

### Parse Version JSON 

Parse minecraft version as a resolved version, which is used for launching process. You can also read version info from it if you want.

```ts
    import { Version } from "@gmcl/core";
    const minecraftLocation: string;
    const minecraftVersionId: string;

    const resolvedVersion: ResolvedVersion = await Version.parse(minecraftLocation, minecraftVersionId);
```

### Diagnose

Get the report of the version. It can check if version missing assets/libraries.

```ts
    import { MinecraftLocation, diagnose, ResolvedVersion } from "@gmcl/core";
    
    const minecraft: MinecraftLocation;
    const version: string; // version string like 1.13
    const resolvedVersion: ResolvedVersion = await Version.parse(minecraft, version);

    const report: MinecraftIssueReport = await diagnose(resolvedVersion.id, resolvedVersion.minecraftDirectory);

    const issues: MinecraftIssues[] = report.issues;

    for (let issue of issues) {
        switch (issue.role) {
            case "minecraftJar": // your jar has problem
            case "versionJson": // your json has problem
            case "library": // your lib might be missing or corrupted
            case "assets": // some assets are missing or corrupted
            // and so on
        }
    }
```


### Launch Game

Launch minecraft from a version:

```ts
    import { launch } from "@gmcl/core"
    const version: string; // full version id, like 1.13, or your forge version like, 1.13-forge-<someForgeVersion>
    const javaPath: string; // java executable path
    const gamePath: string; // .minecraft path
    const proc: Promise<ChildProcess> = launch({ gamePath, javaPath, version });
```

Detach from the parent process. So your launcher's exit/crash won't affact the Minecraft running.

```ts
    const proc: Promise<ChildProcess> = Launcher.launch({ gamePath, javaPath, version, extraExecOption: { detached: true } });
```