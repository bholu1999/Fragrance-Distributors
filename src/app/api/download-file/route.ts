import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('filename');
    
    if (!fileName) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }
    
    // Security check to avoid directory traversal
    const safeFileName = path.basename(fileName);
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const filePath = path.join(dataDir, safeFileName);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    const headers = new Headers();
    
    // Determine content type
    let contentType = 'application/octet-stream';
    if (safeFileName.endsWith('.xlsx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (safeFileName.endsWith('.xls')) {
      contentType = 'application/vnd.ms-excel';
    }
    
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(safeFileName)}"`);
    headers.set('Content-Type', contentType);
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error('Download error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
