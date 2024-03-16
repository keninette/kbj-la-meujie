import { Player } from '@/model/session/player.class';
import { FormEvent, useState } from 'react';

type PlayerFormProps = {
  players: Player[];
  onSubmitCallback: (player: Player) => void;
  requestedPlayer?: Player;
};

export default function PlayerForm({ requestedPlayer, players, onSubmitCallback }: PlayerFormProps) {
  const [player, setPlayer] = useState<Player>(requestedPlayer || new Player('', ''));

  const onChange = (fieldName: string, value: string) => {
    if (fieldName === 'player') {
      const existingPlayer = players.find((thisPlayer) => thisPlayer.playerId === value);
      if (!existingPlayer) {
        console.error('Joueur non trouvé');
        return;
      }
      setPlayer(existingPlayer);
    } else {
      setPlayer((prevState) => ({ ...prevState, [fieldName]: value }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    onSubmitCallback(player);
  };

  return (
    <div className='flex flex-col w-full'>
      <h3 className='flex justify-center text-lg underline my-4 font-bold'>Ajouter un joueur</h3>
      <form onSubmit={onSubmit} className='flex flex-col'>
        <select onChange={(e) => onChange('player', e.target.value)} className='text-black'>
          <option value=''>-</option>
          {players.map((thisPlayer) => (
            <option key={thisPlayer.playerId} value={thisPlayer.playerId}>
              {thisPlayer.name}({thisPlayer.characterName})
            </option>
          ))}
        </select>
        <input
          className='text-black mt-2'
          type='text'
          name='name'
          id='name'
          placeholder='Nom'
          onChange={(e) => onChange('name', e.target.value)}
          value={player.name}
        />
        <input
          className='mt-2 text-black'
          type='text'
          name='characterName'
          id='characterName'
          placeholder='Nom du personnage'
          onChange={(e) => onChange('characterName', e.target.value)}
          value={player.characterName}
        />
        <button type='submit'>Enregistrer</button>
      </form>
    </div>
  );
}
