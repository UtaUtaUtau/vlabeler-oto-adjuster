try {
    let entryIndices = params.filters;

    for (let index of entryIndices) {
        let entry = entries[index];
        
        if (params.doPreutterance) {
            let preu = entry.points[1] - entry.points[3];
            let diffPreu = params.preutterance - preu;
            entry.start -= diffPreu;
            entry.points[3] -= diffPreu;
            entry.points[1] = params.preutterance + entry.points[3];
        }
        
        if (params.doOverlap) {
            entry.points[2] = params.overlap + entry.points[3];
        }
        
        if (params.doConsonant) {
            entry.points[0] = params.consonant + entry.points[3];
        }
        
        if (params.doCutoff) {
            if (params.cutoff < 0) {
                entry.end = -params.cutoff + entry.points[3];
            } else {
                entry.needSync = true;
                entry.end = -params.cutoff;
                entry.extras[0] = params.cutoff.toString();
            }
        }
        
        if (params.doOffset) {
            entry.start += params.offset;
            for (let i = 0; i < 4; i++) {
                entry.points[i] += params.offset;
            }
        }
    }
} catch (err) {
    error(err.cause);
}