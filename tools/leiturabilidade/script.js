// leiturabilidade/script.js
document.getElementById('fileInput').addEventListener('change', handleFileUpload);
document.getElementById('language').addEventListener('change', handleLanguageChange);

const STOP_WORDS = new Set([
    'a', 'ao', 'aos', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aquilo', 'as', 'às', 'até', 'com', 'como', 'da', 'das', 'de', 'dei', 'dela', 'delas', 'dele', 'deles', 'demais', 'desde', 'do', 'dos', 'e', 'ela', 'elas', 'ele', 'eles', 'em', 'entre', 'era', 'eram', 'essa', 'essas', 'esse', 'esses', 'esta', 'estas', 'este', 'estes', 'eu', 'foi', 'fomos', 'for', 'fora', 'foram', 'fosse', 'fui', 'há', 'isso', 'isto', 'já', 'lhe', 'lhes', 'mais', 'mas', 'me', 'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito', 'na', 'nas', 'nem', 'no', 'nos', 'nós', 'nossa', 'nossas', 'nosso', 'nossos', 'num', 'numa', 'o', 'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos', 'pelo', 'pela', 'porque', 'qual', 'quando', 'que', 'quem', 'se', 'seja', 'sejam', 'será', 'serão', 'serei', 'seremos', 'seria', 'só', 'somos', 'sua', 'suas', 'ter', 'terá', 'terão', 'terei', 'teremos', 'tinha', 'tinham', 'tive', 'tiveram', 'tinha', 'teve', 'um', 'uma', 'umas', 'uns', 'você', 'vocês'
]);

// Variável global para armazenar o conteúdo do último arquivo analisado
let lastAnalyzedContent = '';

function handleLanguageChange() {
    // Reanalisa o último conteúdo com o novo idioma se houver um arquivo carregado
    if (lastAnalyzedContent) {
        analyzeReadability(lastAnalyzedContent);
    } else {
        // Limpa as áreas se não houver conteúdo para analisar
        document.getElementById('resultsArea').innerHTML = '';
        document.getElementById('reportArea').innerHTML = '';
        const oldCanvas = document.getElementById('wordFrequencyChart');
        if (oldCanvas) {
            oldCanvas.remove();
        }
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'wordFrequencyChart';
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(newCanvas, document.getElementById('resultsArea'));
        }
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        document.getElementById('resultsArea').innerHTML = '<p class="error-message">Nenhum arquivo selecionado.</p>';
        document.getElementById('reportArea').innerHTML = '';
        const oldCanvas = document.getElementById('wordFrequencyChart');
        if (oldCanvas) {
            oldCanvas.remove();
        }
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'wordFrequencyChart';
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(newCanvas, document.getElementById('resultsArea'));
        }
        lastAnalyzedContent = ''; // Limpa o conteúdo armazenado
        return;
    }

    if (file.type !== 'text/markdown' && !file.name.endsWith('.md')) {
        document.getElementById('resultsArea').innerHTML = '<p class="error-message">Por favor, selecione um arquivo Markdown (.md).</p>';
        document.getElementById('reportArea').innerHTML = '';
        const oldCanvas = document.getElementById('wordFrequencyChart');
        if (oldCanvas) {
            oldCanvas.remove();
        }
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'wordFrequencyChart';
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(newCanvas, document.getElementById('resultsArea'));
        }
        lastAnalyzedContent = ''; // Limpa o conteúdo armazenado
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        if (content.trim().length === 0) {
            document.getElementById('resultsArea').innerHTML = '<p class="error-message">O arquivo selecionado está vazio.</p>';
            document.getElementById('reportArea').innerHTML = '';
            const oldCanvas = document.getElementById('wordFrequencyChart');
            if (oldCanvas) {
                oldCanvas.remove();
            }
            const newCanvas = document.createElement('canvas');
            newCanvas.id = 'wordFrequencyChart';
            const container = document.querySelector('.container');
            if (container) {
                container.insertBefore(newCanvas, document.getElementById('resultsArea'));
            }
            lastAnalyzedContent = ''; // Limpa o conteúdo armazenado
            return;
        }
        lastAnalyzedContent = content; // Armazena o conteúdo para reanálise
        analyzeReadability(content);
    };

    reader.onerror = function() {
        document.getElementById('resultsArea').innerHTML = '<p class="error-message">Erro ao ler o arquivo.</p>';
        document.getElementById('reportArea').innerHTML = '';
        const oldCanvas = document.getElementById('wordFrequencyChart');
        if (oldCanvas) {
            oldCanvas.remove();
        }
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'wordFrequencyChart';
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(newCanvas, document.getElementById('resultsArea'));
        }
        lastAnalyzedContent = ''; // Limpa o conteúdo armazenado
    };

    reader.readAsText(file);
}

function analyzeReadability(content) {
    const cleanedContent = content.replace(/[#*\-`]/g, '');
    const selectedLanguage = document.getElementById('language').value;

    const results = {
        "Flesch Reading Ease": selectedLanguage === 'pt-br' ? textstat.flesch_reading_ease_ptbr(cleanedContent) : textstat.flesch_reading_ease(cleanedContent),
        "Flesch-Kincaid Grade": textstat.flesch_kincaid_grade(cleanedContent),
        "SMOG Index": textstat.smog_index(cleanedContent),
        "Coleman-Liau Index": textstat.coleman_liau_index(cleanedContent),
        "Automated Readability Index": textstat.automated_readability_index(cleanedContent),
        "Dale-Chall Readability Score": textstat.dale_chall_readability_score(cleanedContent),
        "Difficult Words": textstat.difficult_words(cleanedContent),
        "Linsear Write Formula": textstat.linsear_write_formula(cleanedContent),
        "Gunning Fog": textstat.gunning_fog(cleanedContent),
        "Text Standard": textstat.text_standard(cleanedContent, selectedLanguage) // Passa o idioma para text_standard
    };

    displayResults(results, selectedLanguage); // Passa o idioma para displayResults
    const wordFreq = getWordFrequency(cleanedContent);
    createWordFrequencyChart(wordFreq);
    generateReport(results, wordFreq, selectedLanguage); // Passa o idioma para generateReport
}

function displayResults(results, lang) {
    const resultsArea = document.getElementById('resultsArea');
    const fleschInterpretation = lang === 'pt-br' ? interpretFleschReadingEasePtBr(results["Flesch Reading Ease"]) : interpretFleschReadingEase(results["Flesch Reading Ease"]);

    resultsArea.innerHTML = `
        <h2>Resultados da Análise de Legibilidade</h2>
        <div class="results-grid">
            <div class="result-card">
                <h3>${lang === 'pt-br' ? 'Flesch Brasileiro' : 'Flesch Reading Ease'}</h3>
                <p class="score">${results["Flesch Reading Ease"].toFixed(2)}</p>
                <p class="description">${fleschInterpretation[0]}</p>
            </div>
            <div class="result-card">
                <h3>Flesch-Kincaid Grade</h3>
                <p class="score">${results["Flesch-Kincaid Grade"].toFixed(2)}</p>
                <p class="description">Nível escolar americano</p>
            </div>
            <div class="result-card">
                <h3>SMOG Index</h3>
                <p class="score">${results["SMOG Index"].toFixed(2)}</p>
                <p class="description">Anos de educação necessários</p>
            </div>
            <div class="result-card">
                <h3>Coleman-Liau Index</h3>
                <p class="score">${results["Coleman-Liau Index"].toFixed(2)}</p>
                <p class="description">Nível escolar americano</p>
            </div>
            <div class="result-card">
                <h3>Automated Readability Index</h3>
                <p class="score">${results["Automated Readability Index"].toFixed(2)}</p>
                <p class="description">Nível escolar americano</p>
            </div>
            <div class="result-card">
                <h3>Dale-Chall Readability Score</h3>
                <p class="score">${results["Dale-Chall Readability Score"].toFixed(2)}</p>
                <p class="description">Pontuação de dificuldade</p>
            </div>
            <div class="result-card">
                <h3>Gunning Fog</h3>
                <p class="score">${results["Gunning Fog"].toFixed(2)}</p>
                <p class="description">Anos de educação necessários</p>
            </div>
            <div class="result-card">
                <h3>Linsear Write Formula</h3>
                <p class="score">${results["Linsear Write Formula"].toFixed(2)}</p>
                <p class="description">Nível escolar americano</p>
            </div>
            <div class="result-card wide">
                <h3>Palavras Difíceis</h3>
                <p class="score">${results["Difficult Words"]}</p>
                <p class="description">Palavras com 3 ou mais sílabas</p>
            </div>
            <div class="result-card wide">
                <h3>Padrão de Texto</h3>
                <p class="score">${results["Text Standard"]}</p>
                <p class="description">Nível de ensino sugerido</p>
            </div>
        </div>
    `;
}

function getWordFrequency(content) {
    const words = content.toLowerCase().match(/\b\w+\b/g).filter(word => !STOP_WORDS.has(word));
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    return wordFreq;
}

function createWordFrequencyChart(wordFreq) {
    const existingChart = Chart.getChart('wordFrequencyChart');
    if (existingChart) {
        existingChart.destroy();
    }

    const ctx = document.getElementById('wordFrequencyChart').getContext('2d');
    const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const labels = topWords.map(item => item[0]);
    const data = topWords.map(item => item[1]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frequência de Palavras',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generateReport(results, wordFreq, lang) {
    const reportArea = document.getElementById('reportArea');
    const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const topWordsStr = topWords.map(item => `"${item[0]}" (${item[1]} vezes)`).join(', ');

    const fleschInterpretation = lang === 'pt-br' ? interpretFleschReadingEasePtBr(results["Flesch Reading Ease"]) : interpretFleschReadingEase(results["Flesch Reading Ease"]);

    let langSpecificWarning = '';
    if (lang === 'pt-br') {
        langSpecificWarning = `
            <p class="warning-message">
                <strong>Atenção:</strong> As métricas Flesch-Kincaid Grade, SMOG Index, Coleman-Liau Index, Automated Readability Index, Dale-Chall Readability Score, Linsear Write Formula e Gunning Fog são projetadas para a língua inglesa e podem não refletir com precisão a legibilidade para textos em português. A métrica "Flesch Brasileiro" é a mais recomendada para esta análise.
            </p>
        `;
    }

    reportArea.innerHTML = `
        <h2>Relatório Detalhado</h2>

        ${langSpecificWarning}

        <div class="report-section">
            <h3>Resumo da Legibilidade</h3>
            <p>Com base na análise, este texto possui uma pontuação de <strong>${lang === 'pt-br' ? 'Flesch Brasileiro' : 'Flesch Reading Ease'} de ${results["Flesch Reading Ease"].toFixed(2)}</strong>, indicando que ele é classificado como <strong>${fleschInterpretation[0].toLowerCase()}</strong>. Isso sugere que o conteúdo é mais adequado para um público com nível de leitura de <strong>${fleschInterpretation[1].toLowerCase()}</strong>.</p>
        </div>

        <div class="report-section">
            <h3>Níveis de Leitura Sugeridos</h3>
            <ul>
                <li><strong>Flesch-Kincaid Grade:</strong> Aproximadamente ${results["Flesch-Kincaid Grade"].toFixed(2)}º ano escolar (EUA).</li>
                <li><strong>SMOG Index:</strong> Requer cerca de ${results["SMOG Index"].toFixed(2)} anos de educação para compreensão.</li>
                <li><strong>Gunning Fog:</strong> Estima um nível educacional de ${results["Gunning Fog"].toFixed(2)} anos para leitura fácil.</li>
                <li><strong>Padrão de Texto:</strong> ${results["Text Standard"]} (${results["Flesch-Kincaid Grade"].toFixed(2)}º ano).</li>
            </ul>
        </div>

        <div class="report-section">
            <h3>Complexidade do Vocabulário</h3>
            <p>O texto contém <strong>${results["Difficult Words"]} palavras difíceis</strong> (com 3 ou mais sílabas). A pontuação <strong>Dale-Chall de ${results["Dale-Chall Readability Score"].toFixed(2)}</strong> indica a dificuldade do vocabulário.</p>
            <p>As 10 palavras mais comuns (excluindo palavras de parada) são: ${topWordsStr}.</p>
        </div>

        <div class="report-section">
            <h3>Recomendações para Melhoria</h3>
            <ul>
                <li>${results["Flesch Reading Ease"] < 60 ? "<strong>Simplificar o vocabulário e a estrutura das frases:</strong> Para alcançar um público mais amplo, reduza o uso de termos complexos e construa frases mais curtas e diretas." : results["Flesch Reading Ease"] < 80 ? "<strong>Manter o nível atual:</strong> A legibilidade está em um bom patamar para o público geral. Continue com o estilo atual." : "<strong>Considerar adicionar mais profundidade:</strong> Se o público for especializado, você pode adicionar mais detalhes ou terminologia técnica, mantendo a clareza geral."}</li>
                <li>${results["Gunning Fog"] > 12 ? "<strong>Reduzir o comprimento e a complexidade das frases:</strong> Frases muito longas aumentam a dificuldade. Tente dividi-las em sentenças mais curtas e com ideias únicas." : results["Gunning Fog"] >= 10 ? "<strong>Comprimento de frase adequado:</strong> As frases estão em um bom nível de complexidade. Mantenha o equilíbrio entre clareza e profundidade." : "<strong>Explorar maior complexidade:</strong> Para um público mais avançado, você pode considerar introduzir frases um pouco mais longas ou estruturas mais elaboradas, se apropriado."}</li>
                <li><strong>Diversificar o vocabulário:</strong> Embora as palavras mais comuns sejam essenciais, revise o uso repetitivo de algumas e considere sinônimos para enriquecer o texto e evitar redundâncias.</li>
            </ul>
        </div>
    `;
}

function interpretFleschReadingEase(score) {
    if (score < 30) {
        return ["Muito difícil", "Melhor entendido por graduados universitários."];
    } else if (score < 50) {
        return ["Difícil", "Nível universitário."];
    } else if (score < 60) {
        return ["Razoavelmente difícil", "10º a 12º ano."];
    } else if (score < 70) {
        return ["Padrão", "8º e 9º ano."];
    } else if (score < 80) {
        return ["Razoavelmente fácil", "7º ano."];
    } else if (score < 90) {
        return ["Fácil", "6º ano."];
    } else {
        return ["Muito fácil", "5º ano."];
    }
}

// NOVO: Interpretação para Flesch Brasileiro [cite: 34]
function interpretFleschReadingEasePtBr(score) {
    if (score >= 75) {
        return ["Muito fácil", "1º a 5º ano do Ensino Fundamental."];
    } else if (score >= 50) {
        return ["Fácil", "6º a 9º ano do Ensino Fundamental."];
    } else if (score >= 25) {
        return ["Difícil", "Ensino Médio."];
    } else {
        return ["Muito difícil", "Ensino Superior."];
    }
}