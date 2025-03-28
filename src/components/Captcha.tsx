'use client';

import { ReloadOutlined } from '@ant-design/icons';
import { Button, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';

type CaptchaType = 'image' | 'audio' | 'text';

const captchaImages = [
  { id: 1, src: 'https://source.unsplash.com/100x100/?cat', type: 'cat' },
  { id: 2, src: 'https://source.unsplash.com/100x100/?dog', type: 'dog' },
  { id: 3, src: 'https://source.unsplash.com/100x100/?koala', type: 'koala' },
  { id: 4, src: 'https://source.unsplash.com/100x100/?bird', type: 'bird' },
  { id: 5, src: 'https://source.unsplash.com/100x100/?fish', type: 'fish' },
  { id: 6, src: 'https://source.unsplash.com/100x100/?rabbit', type: 'rabbit' },
];

const generateTextCaptcha = () => {
  const operators = ['+', '-', '*'];
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const question = `${num1} ${operator} ${num2}`;
  const answer = eval(question).toString();
  return { question, answer };
};

const generateAudioCaptcha = () => {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
  const audioText = randomNumbers.map(num => numbers[num]).join(' ');
  return { audioText, answer: randomNumbers.join('') };
};

interface CaptchaProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  onBack: () => void;
}

const Captcha = ({ onSuccess, onError, onBack }: CaptchaProps) => {
  const [captchaType, setCaptchaType] = useState<CaptchaType>('image');
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaTarget, setCaptchaTarget] = useState('');
  const [images, setImages] = useState<Array<{ id: number, src: string, type: string }>>([]);
  const [textCaptcha, setTextCaptcha] = useState({ question: '', answer: '' });
  const [audioCaptcha, setAudioCaptcha] = useState({ audioText: '', answer: '' });

  const generateCaptcha = () => {
    setCaptchaLoading(true);
    const types = ['cat', 'dog', 'koala', 'bird', 'fish', 'rabbit'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const timestamp = Date.now();

    const correctImage = {
      id: 1,
      src: `https://source.unsplash.com/100x100/?${randomType}&${timestamp}`,
      type: randomType
    };

    const wrongTypes = types.filter(t => t !== randomType);
    const wrongImages: { id: number; src: string; type: string }[] = [];

    while (wrongImages.length < 5) {
      const randomWrongType = wrongTypes[Math.floor(Math.random() * wrongTypes.length)];
      if (!wrongImages.some(img => img.type === randomWrongType)) {
        wrongImages.push({
          id: wrongImages.length + 2,
          src: `https://source.unsplash.com/100x100/?${randomWrongType}&${timestamp}`,
          type: randomWrongType
        });
      }
    }

    const allImages = [correctImage, ...wrongImages];
    const shuffled = allImages.sort(() => 0.5 - Math.random());

    setCaptchaTarget(randomType);
    setImages(shuffled);

    setTimeout(() => {
      setCaptchaLoading(false);
    }, 500);
  };
  useEffect(() => {
    if (captchaType === 'image') {
      generateCaptcha();
    }
  }, [captchaType]);

  const generateRandomCaptcha = () => {
    const types: CaptchaType[] = ['image', 'audio', 'text'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCaptchaType(randomType);

    if (randomType === 'image') {
      generateCaptcha();
    } else if (randomType === 'text') {
      setTextCaptcha(generateTextCaptcha());
    } else if (randomType === 'audio') {
      setAudioCaptcha(generateAudioCaptcha());
    }
  };

  const handleCaptchaSubmit = (userInput: string) => {
    let isValid = false;

    if (captchaType === 'image') {
      isValid = userInput === captchaTarget;
    } else if (captchaType === 'text') {
      isValid = userInput === textCaptcha.answer;
    } else if (captchaType === 'audio') {
      isValid = userInput === audioCaptcha.answer;
    }

    if (isValid) {
      onSuccess();
    } else {
      onError('Verification failed. Please try again.');
      if (captchaType === 'image') {
        generateCaptcha();
      } else if (captchaType === 'text') {
        setTextCaptcha(generateTextCaptcha());
      } else if (captchaType === 'audio') {
        setAudioCaptcha(generateAudioCaptcha());
      }
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <h2 className="text-xl font-medium mb-4">Solve this puzzle to protect your account</h2>

      {captchaType === 'image' && (
        <div className="text-center mb-4">
          <p>Select all images containing <strong>{captchaTarget}</strong></p>
          <Button
            icon={<ReloadOutlined />}
            onClick={generateCaptcha}
            className="mt-2 !rounded-sm !px-2 !py-1"
          >
            Refresh
          </Button>
        </div>
      )}

      {captchaType === 'image' && captchaLoading ? (
        <div className="flex justify-center py-8">
          <Spin size="small" />
        </div>
      ) : (
        captchaType === 'image' && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((image) => (
              <div
                key={image.id}
                className="cursor-pointer border hover:border-blue-500 aspect-square"
                onClick={() => handleCaptchaSubmit(image.type)}
              >
                <img
                  src={image.src}
                  alt="Captcha image"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const fallbackUrls = {
                      cat: 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=100',
                      dog: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=100',
                      koala: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/100px-Koala_climbing_tree.jpg',
                      bird: 'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=100',
                      fish: 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=100',
                      rabbit: 'https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?auto=compress&cs=tinysrgb&w=100'
                    };
                    (e.target as HTMLImageElement).src = fallbackUrls[image.type as keyof typeof fallbackUrls] || 'https://picsum.photos/100/100';
                  }}
                />
              </div>
            ))}
          </div>
        )
      )}

      {captchaType === 'text' && (
        <div className="text-center">
          <p>Solve the following math problem:</p>
          <p className="text-2xl font-bold my-4">{textCaptcha.question}</p>
          <Input
            placeholder="Your answer"
            onPressEnter={(e) => handleCaptchaSubmit((e.target as HTMLInputElement).value)}
          />
          <Button
            type="primary"
            onClick={() => handleCaptchaSubmit((document.querySelector('input[placeholder="Your answer"]') as HTMLInputElement)?.value)}
            className="mt-2 !rounded-sm !px-2 !py-1"
          >
            Submit
          </Button>
        </div>
      )}

      {captchaType === 'audio' && (
        <div className="text-center">
          <p>Listen and type the numbers you hear:</p>
          <div className="my-4">
            <audio controls>
              <source
                src={`https://api.voicerss.org/?key=4c8646dd8c724b6ea29e3e8f6746eb78&hl=en-us&src=${encodeURIComponent(audioCaptcha.audioText)}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
          <Input
            placeholder="Type the numbers"
            onPressEnter={(e) => handleCaptchaSubmit((e.target as HTMLInputElement).value)}
          />
          <Button
            type="primary"
            onClick={() => handleCaptchaSubmit((document.querySelector('input[placeholder="Type the numbers"]') as HTMLInputElement)?.value)}
            className="mt-2 !rounded-sm !px-2 !py-1"
          >
            Submit
          </Button>
        </div>
      )}

      <div className="mt-4 text-center flex justify-center gap-2">
        <Button
          icon={<ReloadOutlined />}
          onClick={generateRandomCaptcha}
          className="!rounded-sm !px-2 !py-1"
        >
          Try another type
        </Button>
        <Button
          onClick={onBack}
          className="!rounded-sm !px-2 !py-1"
        >
          Back to Form
        </Button>
      </div>
    </div>
  );
};

export default Captcha;