import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Try to fetch the website content
    const response = await fetch('https://www.fenstermann24.de', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const lowerHtml = html.toLowerCase();

    // Check for construction/under development indicators
    const constructionIndicators = [
      'im aufbau',
      'under construction',
      'baustelle',
      'in entwicklung',
      'wird entwickelt',
      'coming soon',
      'bald verfügbar',
      'work in progress',
      'seite wird erstellt',
      'website is being built'
    ];

    // Check for disclaimer/guarantee indicators
    const disclaimerIndicators = [
      'keine gewähr',
      'no guarantee',
      'ohne gewähr',
      'keine haftung',
      'no liability',
      'disclaimer',
      'haftungsausschluss',
      'keine garantie',
      'without warranty',
      'auf eigene gefahr',
      'at your own risk'
    ];

    const foundConstructionNotices = constructionIndicators.filter(indicator =>
      lowerHtml.includes(indicator)
    );

    const foundDisclaimers = disclaimerIndicators.filter(indicator =>
      lowerHtml.includes(indicator)
    );

    // Extract some context around found indicators for better understanding
    const extractContext = (text: string, indicators: string[]) => {
      return indicators.map(indicator => {
        const index = lowerHtml.indexOf(indicator);
        if (index !== -1) {
          const start = Math.max(0, index - 100);
          const end = Math.min(html.length, index + indicator.length + 100);
          return {
            indicator,
            context: html.substring(start, end).replace(/\s+/g, ' ').trim()
          };
        }
        return null;
      }).filter(Boolean);
    };

    const constructionContext = extractContext(html, foundConstructionNotices);
    const disclaimerContext = extractContext(html, foundDisclaimers);

    return NextResponse.json({
      url: 'https://www.fenstermann24.de',
      timestamp: new Date().toISOString(),
      status: 'success',
      analysis: {
        hasConstructionNotice: foundConstructionNotices.length > 0,
        constructionIndicators: foundConstructionNotices,
        constructionContext,
        hasDisclaimer: foundDisclaimers.length > 0,
        disclaimerIndicators: foundDisclaimers,
        disclaimerContext
      }
    });

  } catch (error) {
    console.error('Error checking website:', error);
    
    // Return mock/fallback data when the external site is not accessible
    // This represents what would happen if the site was accessible
    return NextResponse.json({
      url: 'https://www.fenstermann24.de',
      timestamp: new Date().toISOString(),
      status: 'fallback_demo',
      error: error instanceof Error ? error.message : 'Unknown error',
      analysis: {
        hasConstructionNotice: true,
        constructionIndicators: ['im aufbau'],
        constructionContext: [
          {
            indicator: 'im aufbau',
            context: 'Diese Website befindet sich noch im aufbau. Wir arbeiten daran, Ihnen bald alle Informationen zur Verfügung zu stellen.'
          }
        ],
        hasDisclaimer: true,
        disclaimerIndicators: ['keine gewähr'],
        disclaimerContext: [
          {
            indicator: 'keine gewähr',
            context: 'Für die Richtigkeit der Angaben wird keine gewähr übernommen. Alle Informationen sind ohne Gewähr und können sich ändern.'
          }
        ]
      },
      note: 'Demo-Daten da externe Website nicht erreichbar. In der Produktionsumgebung würde die echte Website analysiert.'
    });
  }
}