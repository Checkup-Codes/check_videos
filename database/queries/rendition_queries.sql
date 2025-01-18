-- Temel Sorgular

-- 1. Tüm kelimeleri ve anlamlarını getir
SELECT word, meaning, language, learning_status, difficulty_level
FROM words
ORDER BY language, word;

-- 2. Belirli bir dil paketindeki kelimeleri getir
SELECT w.word, w.meaning, w.type, w.difficulty_level
FROM words w
JOIN word_pack_relations wpr ON w.id = wpr.word_id
JOIN language_packs lp ON wpr.pack_id = lp.id
WHERE lp.name = 'Essential English Words'
ORDER BY w.word;

-- 3. Zorluk seviyesi 4 olan kelimeleri getir
SELECT word, meaning, language, difficulty_level
FROM words
WHERE difficulty_level = 4
ORDER BY language, word;

-- 4. Henüz öğrenilmemiş kelimeleri getir (learning_status = 0)
SELECT word, meaning, language, difficulty_level
FROM words
WHERE learning_status = 0
ORDER BY difficulty_level, word;

-- 5. Her dildeki kelime sayısını getir
SELECT language, COUNT(*) as word_count
FROM words
GROUP BY language;

-- İlişkili Sorgular

-- 6. Kelimeleri örnek cümleleriyle birlikte getir
SELECT w.word, w.meaning, es.sentence, es.translation
FROM words w
LEFT JOIN example_sentences es ON w.id = es.word_id
ORDER BY w.language, w.word;

-- 7. İngilizce kelimeleri eş anlamlılarıyla birlikte getir
SELECT w.word, s.synonym
FROM words w
LEFT JOIN synonyms s ON w.id = s.word_id
WHERE w.language = 'en'
ORDER BY w.word;

-- 8. Her dil paketindeki kelime sayısını getir
SELECT lp.name, lp.language, COUNT(w.id) as word_count
FROM language_packs lp
LEFT JOIN word_pack_relations wpr ON lp.id = wpr.pack_id
LEFT JOIN words w ON wpr.word_id = w.id
GROUP BY lp.id, lp.name, lp.language
ORDER BY lp.language, lp.name;

-- Kompleks Sorgular

-- 9. En çok örnek cümlesi olan 5 kelimeyi getir
SELECT w.word, w.meaning, COUNT(es.id) as example_count
FROM words w
LEFT JOIN example_sentences es ON w.id = es.word_id
GROUP BY w.id, w.word, w.meaning
ORDER BY example_count DESC
LIMIT 5;

-- 10. Eş anlamlısı olan ama örnek cümlesi olmayan kelimeleri getir
SELECT w.word, w.meaning
FROM words w
INNER JOIN synonyms s ON w.id = s.word_id
LEFT JOIN example_sentences es ON w.id = es.word_id
WHERE es.id IS NULL;

-- 11. Öğrenme durumuna göre kelime dağılımını getir
SELECT 
    language,
    SUM(CASE WHEN learning_status = 0 THEN 1 ELSE 0 END) as not_learned,
    SUM(CASE WHEN learning_status = 1 THEN 1 ELSE 0 END) as learning,
    SUM(CASE WHEN learning_status = 2 THEN 1 ELSE 0 END) as learned
FROM words
GROUP BY language;

-- 12. Her zorluk seviyesindeki ortalama doğru/yanlış oranını getir
SELECT 
    difficulty_level,
    AVG(CASE WHEN correct_count + incorrect_count > 0 
        THEN (correct_count::float / (correct_count + incorrect_count)) 
        ELSE 0 END) as average_success_rate
FROM words
GROUP BY difficulty_level
ORDER BY difficulty_level;

-- 13. Son 30 günde en çok tekrar edilen 10 kelimeyi getir
SELECT word, meaning, review_count, last_review_date
FROM words
WHERE last_review_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY review_count DESC
LIMIT 10;

-- 14. Hiç eş anlamlısı olmayan İngilizce kelimeleri getir
SELECT w.word, w.meaning
FROM words w
LEFT JOIN synonyms s ON w.id = s.word_id
WHERE w.language = 'en' AND s.id IS NULL;

-- 15. Her kelime türüne göre zorluk seviyesi dağılımını getir
SELECT 
    type,
    SUM(CASE WHEN difficulty_level = 1 THEN 1 ELSE 0 END) as easy,
    SUM(CASE WHEN difficulty_level = 2 THEN 1 ELSE 0 END) as medium,
    SUM(CASE WHEN difficulty_level = 3 THEN 1 ELSE 0 END) as hard,
    SUM(CASE WHEN difficulty_level = 4 THEN 1 ELSE 0 END) as very_hard
FROM words
GROUP BY type
ORDER BY type;

-- 16. Aynı dil paketinde bulunan kelime çiftlerini getir
SELECT 
    w1.word as word1,
    w2.word as word2,
    lp.name as pack_name
FROM words w1
JOIN word_pack_relations wpr1 ON w1.id = wpr1.word_id
JOIN word_pack_relations wpr2 ON wpr1.pack_id = wpr2.pack_id
JOIN words w2 ON wpr2.word_id = w2.id
JOIN language_packs lp ON wpr1.pack_id = lp.id
WHERE w1.id < w2.id
ORDER BY lp.name, w1.word;

-- 17. Her dildeki ortalama zorluk seviyesini getir
SELECT 
    language,
    AVG(difficulty_level) as avg_difficulty,
    MIN(difficulty_level) as min_difficulty,
    MAX(difficulty_level) as max_difficulty
FROM words
GROUP BY language;

-- 18. En çok eş anlamlısı olan 5 kelimeyi getir
SELECT w.word, COUNT(s.id) as synonym_count
FROM words w
LEFT JOIN synonyms s ON w.id = s.word_id
GROUP BY w.id, w.word
ORDER BY synonym_count DESC
LIMIT 5;

-- 19. Hiç kullanılmamış kelimeleri getir (correct_count + incorrect_count = 0)
SELECT word, meaning, language
FROM words
WHERE correct_count = 0 AND incorrect_count = 0
ORDER BY language, word;

-- 20. Başarı oranı en yüksek olan 10 kelimeyi getir
SELECT 
    word,
    meaning,
    correct_count,
    incorrect_count,
    CASE 
        WHEN (correct_count + incorrect_count) > 0 
        THEN (correct_count::float / (correct_count + incorrect_count)) 
        ELSE 0 
    END as success_rate
FROM words
WHERE (correct_count + incorrect_count) > 0
ORDER BY success_rate DESC
LIMIT 10; 