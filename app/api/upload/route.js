// File: /app/api/run-fvu/route.js (for Next 13+/App Router)

import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET() {
    try {
        const jarPath = path.join(process.cwd(), 'TDS_STANDALONE_FVU_9.2', 'TDS_STANDALONE_FVU_9.2.jar');

        console.log("jarPath")
       
        // Launch the GUI of the JAR file
        const javaProcess = spawn('java', ['-jar', jarPath], {
            detached: true,
            stdio: 'ignore' // prevent backend from waiting
        });

        javaProcess.unref(); // let it run independently

        return NextResponse.json({ success: true, message: 'FVU launched' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
