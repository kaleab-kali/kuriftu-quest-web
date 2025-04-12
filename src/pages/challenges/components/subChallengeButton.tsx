import { useState } from 'react';
import { Challenge } from '@/types/challenges';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { SubChallengeForm } from './subChallenge-form';
import { Plus } from 'lucide-react';

export const AddSubChallengeButton = ({ challenge }: { challenge: Challenge }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setModalOpen(true)}
        variant="outline" 
        size="sm"
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Challenge
      </Button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        title="Add Sub-Challenge"
      >
        <SubChallengeForm
          parentChallengeId={challenge.id}
          onSuccess={() => {
            setModalOpen(false);
            console.log('Sub-challenge created successfully!');
          }}
        />
      </Modal>
    </>
  );
};