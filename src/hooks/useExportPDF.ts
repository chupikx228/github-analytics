import { useCallback, useState } from 'react'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { waitForImages } from "../utils/pdfHelper.ts";
import { useRef } from "react";

import useCompareStore from "../store/useCompareStore.ts";

export function useExportPdf() {
    const {user1} = useCompareStore();
    const pageRef = useRef(null)

    const exportPdf = useCallback(async (ref, filename = `GitHub analysis ${user1}`) => {

        const isLight = document.body.classList.contains('light')
        document.body.classList.add('light')

        if (!ref.current) return
        await new Promise((resolve) => setTimeout(resolve, 300))

        try {

        await waitForImages(ref.current)
        await document.fonts.ready

            try {
                await toPng(ref.current, { useCors: true })
            } catch {}

            const dataUrl = await toPng(ref.current, {
            scale: 2,
            useCors: true,
            skipFonts: false,
            filter: (node) => {
                if (node instanceof HTMLImageElement && node.src.includes('skillicons.dev')) {
                    return false
                }
                return true
            }
        })

        const img = new Image()
        img.src = dataUrl
        await new Promise((resolve) => {
            img.onload = resolve
        })

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [img.width / 2, img.height / 2]
        })

        pdf.addImage(dataUrl, 'PNG', 0, 0, img.width / 2, img.height / 2)
        pdf.save(filename)
    }
        finally {
        document.body.style.visibility = 'visible'
        if (!isLight) document.body.classList.remove('light')
    }
    },[user1])

    return { exportPdf }
}