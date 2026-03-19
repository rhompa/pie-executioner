import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// 48 hours from March 18, 2026 7:00 AM COT
const PK_DEADLINE = new Date('2026-03-20T12:00:00Z').getTime()

interface DateRecord {
  current: string
  original: string
  pked?: boolean
}

async function checkAndPk(key: string): Promise<DateRecord | null> {
  const record = await kv.get<DateRecord>(key)
  
  // If no record and deadline passed, mark as pk'd
  if (!record && Date.now() > PK_DEADLINE) {
    const pkedRecord: DateRecord = { current: '', original: '', pked: true }
    await kv.set(key, pkedRecord)
    return pkedRecord
  }
  
  // If record exists but no date set and deadline passed
  if (record && !record.current && !record.pked && Date.now() > PK_DEADLINE) {
    const pkedRecord: DateRecord = { ...record, pked: true }
    await kv.set(key, pkedRecord)
    return pkedRecord
  }
  
  return record
}

export async function GET() {
  try {
    const shenwow = await checkAndPk('pie:shenwow')
    const rhompa = await checkAndPk('pie:rhompa')
    const john = await checkAndPk('pie:john')

    return NextResponse.json({
      shenwow: shenwow || null,
      rhompa: rhompa || null,
      john: john || null,
      pkDeadline: PK_DEADLINE,
    })
  } catch (e) {
    console.error('KV GET error:', e)
    return NextResponse.json({ shenwow: null, rhompa: null, john: null, pkDeadline: PK_DEADLINE })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { project, date, reset } = body as { project: string; date: string; reset?: boolean }

    if (!project || !['shenwow', 'rhompa', 'john'].includes(project.toLowerCase())) {
      return NextResponse.json({ error: 'Invalid project' }, { status: 400 })
    }

    const key = `pie:${project.toLowerCase()}`

    if (reset) {
      await kv.del(key)
      return NextResponse.json({ success: true, record: null })
    }

    if (!date) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }

    const existing = await kv.get<DateRecord>(key)
    if (existing?.pked) {
      return NextResponse.json({ error: 'Already pk\'d. Back to Lumbridge.' }, { status: 403 })
    }

    const record: DateRecord = {
      current: date,
      original: existing?.original || date,
    }

    await kv.set(key, record)

    return NextResponse.json({ success: true, record })
  } catch (e) {
    console.error('KV POST error:', e)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
